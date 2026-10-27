# 🚀 AI Integration Prompts: Add 3D PDF Flipbook into Any Project

Choose the integration prompt that fits your tech stack:

1. **[Prompt 1: Integrate into an Existing Django Project & Admin Panel](#prompt-1-integrate-into-an-existing-django-project--admin-panel)** — Enables administrators to upload, customize, and change front cover images, back cover images, and PDF publications directly from the Django Admin.
2. **[Prompt 2: Integrate into Any Frontend Project (Plain HTML / React / Next.js)](#prompt-2-integrate-into-any-frontend-project-plain-html--react--nextjs)** — Standalone client-side 3D flipbook with StPageFlip and Mozilla PDF.js.

---

## Prompt 1: Integrate into an Existing Django Project & Admin Panel

> **Copy and paste the entire block below into ChatGPT, Claude, Cursor, Copilot, or Gemini:**

```markdown
You are an expert Full-Stack Python/Django Architect and Frontend Engineer. I want to integrate the 3D Realistic PDF Flipbook Reader into my existing Django project, with dynamic controls in the Django Admin panel so site administrators can change the front cover image, back cover image, and upload/manage PDF publications directly from the admin interface.

Reference Repository: https://github.com/Dharmzzz/scroll/tree/pdf

### 1. GOAL & OVERVIEW
We want to add a 3D digital publication flipbook reader with:
1. **Dynamic Django Admin Panel Controls**:
   - **Global Flipbook Settings (`AnnualReportSetting`)**: A singleton admin entry where administrators can upload a default Front Cover image and Back Cover image that applies across all publications.
   - **Publication Management (`AnnualReport`)**: Administrators can add/edit publications with:
     - Title & Year (e.g., "Annual Report 2023-24").
     - PDF Document (`FileField` upload or static asset path fallback).
     - Custom Front Cover Image (optional `ImageField` — overrides global cover if uploaded).
     - Custom Back Cover Image (optional `ImageField` — overrides global back cover if uploaded).
     - Display order and `is_active` toggle.
   - **Live Previews in Django Admin**: Thumbnails in table changelists and large photo previews in the edit form.
2. **Interactive 3D Flipbook Frontend**:
   - In-browser PDF decoding using Mozilla's **PDF.js** (no server-side page splitting into images required).
   - Realistic 3D turning physics via **StPageFlip** (corner drag, realistic curl, drop shadows, spine crease highlights).
   - High-DPI canvas rendering (1.5× devicePixelRatio) for crisp text on Retina/4K screens.
   - Zoom & Pan system (up to 250% zoom with drag-to-pan).
   - Responsive design (2-page physical book spread on desktop, 1-page portrait on mobile).

### 2. STEP 1: MODELS (`models.py`)
Add the models to your Django app:
```python
from django.db import models

class AnnualReportSetting(models.Model):
    """Global Flipbook settings (Default Front & Back Cover images)."""
    singleton_id = models.IntegerField(default=1, unique=True, editable=False)
    default_cover_image = models.ImageField(upload_to='uploads/annual_reports/covers/', blank=True, null=True, help_text="Global default Front Cover image (leave blank for static default)")
    default_back_image = models.ImageField(upload_to='uploads/annual_reports/backs/', blank=True, null=True, help_text="Global default Back Cover image (leave blank for classic gilded binding)")
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Flipbook Cover Setting"
        verbose_name_plural = "Flipbook Cover Settings"

    def save(self, *args, **kwargs):
        self.singleton_id = 1
        super().save(*args, **kwargs)

    @classmethod
    def get_settings(cls):
        obj, _ = cls.objects.get_or_create(singleton_id=1)
        return obj

    def __str__(self):
        return "Global Flipbook Cover Settings"

class AnnualReport(models.Model):
    """An Annual Report publication in the digital 3D flipbook reader."""
    title = models.CharField(max_length=255, help_text="Publication Title, e.g. Annual Report 2023-24")
    year = models.CharField(max_length=50, blank=True, help_text="e.g. 2023-24")
    pdf_file = models.FileField(upload_to='uploads/annual_reports/pdfs/', blank=True, null=True, help_text="Upload PDF publication file")
    pdf_asset_path = models.CharField(max_length=255, blank=True, default='', help_text="Static asset fallback path, e.g. assets/annual_report.pdf")
    cover_image = models.ImageField(upload_to='uploads/annual_reports/covers/', blank=True, null=True, help_text="Custom Front Cover for this report")
    back_image = models.ImageField(upload_to='uploads/annual_reports/backs/', blank=True, null=True, help_text="Custom Back Cover for this report")
    order = models.PositiveIntegerField(default=0, help_text="Sort order (ascending)")
    is_active = models.BooleanField(default=True, help_text="Check to display in flipbook selector")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Annual Report"
        verbose_name_plural = "Annual Reports"

    def __str__(self):
        return self.title
```

### 3. STEP 2: DJANGO ADMIN CONFIGURATION (`admin.py`)
```python
from django.contrib import admin
from django.utils.html import format_html
from django.utils.safestring import mark_safe
from .models import AnnualReport, AnnualReportSetting

@admin.register(AnnualReportSetting)
class AnnualReportSettingAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'cover_thumbnail', 'back_thumbnail', 'updated_at')
    readonly_fields = ('cover_preview', 'back_preview', 'updated_at')
    fieldsets = (
        ('Global Flipbook Cover Settings', {
            'description': 'Configure default Front and Back Cover images for all publications.',
            'fields': ('default_cover_image', 'cover_preview', 'default_back_image', 'back_preview', 'updated_at'),
        }),
    )
    def has_add_permission(self, request):
        return not AnnualReportSetting.objects.exists()
    def has_delete_permission(self, request, obj=None):
        return False
    @admin.display(description="Front Cover")
    def cover_thumbnail(self, obj):
        if obj.default_cover_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; object-fit: cover;" />', obj.default_cover_image.url)
        return mark_safe('<span style="color: #888;">Default Static Cover</span>')
    @admin.display(description="Back Cover")
    def back_thumbnail(self, obj):
        if obj.default_back_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; object-fit: cover;" />', obj.default_back_image.url)
        return mark_safe('<span style="color: #888;">Classic Gilded Binding</span>')
    @admin.display(description="Cover Preview")
    def cover_preview(self, obj):
        if obj.default_cover_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px;" />', obj.default_cover_image.url)
        return mark_safe('<div style="color: #777;">Using default static cover. Upload an image above to override.</div>')
    @admin.display(description="Back Preview")
    def back_preview(self, obj):
        if obj.default_back_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px;" />', obj.default_back_image.url)
        return mark_safe('<div style="color: #777;">Using classic gilded leather back cover. Upload an image above to override.</div>')

@admin.register(AnnualReport)
class AnnualReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'order', 'cover_thumbnail', 'back_thumbnail', 'is_active', 'updated_at')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active', 'year')
    search_fields = ('title', 'year')
    ordering = ('order', 'id')
    readonly_fields = ('cover_preview', 'back_preview', 'created_at', 'updated_at')
    fieldsets = (
        ('Publication Details', {'fields': ('title', 'year', 'order', 'is_active')}),
        ('PDF Publication File', {'fields': ('pdf_file', 'pdf_asset_path')}),
        ('Custom Covers (Front & Back)', {'fields': ('cover_image', 'cover_preview', 'back_image', 'back_preview')}),
        ('Timestamps', {'classes': ('collapse',), 'fields': ('created_at', 'updated_at')}),
    )
    @admin.display(description="Front Cover")
    def cover_thumbnail(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; object-fit: cover;" />', obj.cover_image.url)
        return mark_safe('<span style="color: #888;">(Global Default)</span>')
    @admin.display(description="Back Cover")
    def back_thumbnail(self, obj):
        if obj.back_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; object-fit: cover;" />', obj.back_image.url)
        return mark_safe('<span style="color: #888;">(Global Default)</span>')
    @admin.display(description="Cover Preview")
    def cover_preview(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px;" />', obj.cover_image.url)
        return mark_safe('<div style="color: #777;">Using global default cover.</div>')
    @admin.display(description="Back Preview")
    def back_preview(self, obj):
        if obj.back_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px;" />', obj.back_image.url)
        return mark_safe('<div style="color: #777;">Using global default back cover.</div>')
```

### 4. STEP 3: VIEWS & TEMPLATES
Pass the resolved PDF, front cover, and back cover URLs to the template context:
```python
def annual_reports(request):
    settings_obj = AnnualReportSetting.get_settings()
    default_cover = settings_obj.default_cover_image.url if settings_obj.default_cover_image else f"{settings.STATIC_URL}assets/oyster_annual_report_cover.jpg"
    default_back = settings_obj.default_back_image.url if settings_obj.default_back_image else ""

    db_reports = AnnualReport.objects.filter(is_active=True).order_by('order', 'id')
    reports_list = []
    for r in db_reports:
        pdf_url = r.pdf_file.url if r.pdf_file else (f"{settings.STATIC_URL}{r.pdf_asset_path}" if r.pdf_asset_path else "")
        cover_url = r.cover_image.url if r.cover_image else default_cover
        back_url = r.back_image.url if r.back_image else default_back
        reports_list.append({
            'id': r.id,
            'title': r.title,
            'year': r.year,
            'pdf_url': pdf_url,
            'cover_url': cover_url,
            'back_url': back_url,
        })
    return render(request, 'reports/annual_reports.html', {'reports': reports_list})
```

In the template `<select id="pdf-selector">`:
```html
<select id="pdf-selector">
  {% for rep in reports %}
  <option value="{{ rep.pdf_url }}" 
          data-title="{{ rep.title }}"
          data-cover="{{ rep.cover_url }}" 
          data-back="{{ rep.back_url }}"
          {% if forloop.last %}selected{% endif %}>
    {{ rep.title }}
  </option>
  {% endfor %}
</select>
```

Please inspect my codebase, create the models, register them in admin, copy `css/flipbook.css` and `js/flipbook.js`, and verify in browser.
```

---

## Prompt 2: Integrate into Any Frontend Project (Plain HTML / React / Next.js)

> **Copy and paste the entire block below into ChatGPT, Claude, Cursor, Copilot, or Gemini:**

```markdown
You are an expert Frontend Architect. I want to integrate the 3D Realistic PDF Flipbook reader from https://github.com/Dharmzzz/scroll/tree/pdf into my current project.

### 1. GOAL & OVERVIEW
Integrate an interactive, high-performance in-browser 3D Digital PDF Flipbook featuring:
- Dynamic client-side PDF decoding using Mozilla's PDF.js.
- Realistic 3D book physics powered by StPageFlip (page curls, drop shadows, interactive dog-ear corner drag).
- Custom front and back hardcover bindings with spine crease highlights and depth shadows.
- High-DPI canvas scaling (1.5× * DPR) for razor-sharp text on Retina/4K displays.
- Zoom & pan system (up to 250% zoom with drag-to-pan).
- Full navigation controls: First page, previous, next, last, page input, floating chevrons, and keyboard arrows.
- Responsive layout (2-page book spread on desktop, 1-page portrait on mobile).

### 2. REQUIRED LIBRARIES & CDN DEPENDENCIES
- Mozilla PDF.js: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js`
- PDF Worker: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`
- StPageFlip: `https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js`
- Bootstrap Icons: `https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css`
- Google Fonts: `Cinzel`, `Playfair Display`, `Plus Jakarta Sans`.

Please copy `css/flipbook.css` and `js/flipbook.js` into my project's static assets, place the HTML markup, and verify the reader.
```
