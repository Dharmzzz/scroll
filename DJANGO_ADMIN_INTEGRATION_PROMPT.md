# 🚀 AI Prompt: Integrate 3D PDF Flipbook & Dynamic Django Admin Panel

> **Copy and paste the entire prompt below into ChatGPT, Claude, Cursor, Copilot, or Gemini to automatically integrate this 3D PDF Flipbook reader with full Django Admin panel controls into your existing Django project.**

---

```markdown
You are an expert Full-Stack Python/Django Architect and Modern Frontend Engineer. I want to integrate the 3D Realistic PDF Flipbook Reader into my existing Django project, with full dynamic controls in the Django Admin panel so site administrators can change the front cover image, back cover image, and upload/manage PDF publications directly from the admin interface.

Repository Reference: https://github.com/Dharmzzz/scroll/tree/pdf

---

### 1. GOAL & OVERVIEW

We want to add a 3D digital publication reader (Annual Reports, magazines, brochures, or newsletters) with:
1. **Dynamic Django Admin Panel Controls**:
   - **Global Flipbook Settings (`AnnualReportSetting`)**: A singleton admin entry where administrators can upload a default **Front Cover image** and **Back Cover image** that applies across all publications.
   - **Publication Management (`AnnualReport`)**: Administrators can add/edit publications with:
     - Title & Year (e.g., "Annual Report 2023-24").
     - PDF Document (direct `FileField` upload or legacy static path fallback).
     - Custom Front Cover Image (optional `ImageField` — overrides global cover if uploaded).
     - Custom Back Cover Image (optional `ImageField` — overrides global back cover if uploaded).
     - Display order and `is_active` toggle.
   - **Live Previews in Django Admin**: Thumbnails in table changelists and large photo previews in the edit form.
2. **Interactive 3D Flipbook Frontend**:
   - In-browser PDF decoding using Mozilla's **PDF.js** (zero server-side PDF splitting into images!).
   - Realistic 3D turning physics via **StPageFlip** (corner drag, realistic curl, drop shadows, spine crease highlights).
   - High-DPI canvas rendering (1.5× devicePixelRatio) for crisp text on Retina/4K screens.
   - Zoom & Pan system (up to 250% zoom with drag-to-pan).
   - Responsive design (2-page physical book spread on desktop, 1-page portrait on mobile).

---

### 2. STEP 1: MODELS (`models.py`)

Add the following two models to your Django app (e.g., `reports/models.py` or `home/models.py`):

```python
from django.db import models


class AnnualReportSetting(models.Model):
    """Global Flipbook settings (Default Front & Back Cover images)."""

    singleton_id = models.IntegerField(default=1, unique=True, editable=False)
    default_cover_image = models.ImageField(
        upload_to='uploads/annual_reports/covers/',
        blank=True,
        null=True,
        help_text="Global default Front Cover image for all reports (leave blank to use static cover)",
    )
    default_back_image = models.ImageField(
        upload_to='uploads/annual_reports/backs/',
        blank=True,
        null=True,
        help_text="Global default Back Cover image for all reports (leave blank to use classic gilded back cover)",
    )
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

    title = models.CharField(
        max_length=255,
        help_text="Publication Title, e.g. Annual Report 2023-24",
    )
    year = models.CharField(
        max_length=50,
        blank=True,
        help_text="Academic year / publication period, e.g. 2023-24",
    )
    pdf_file = models.FileField(
        upload_to='uploads/annual_reports/pdfs/',
        blank=True,
        null=True,
        help_text="Upload a PDF publication file directly, or specify static path below",
    )
    pdf_asset_path = models.CharField(
        max_length=255,
        blank=True,
        default='',
        help_text="Path relative to static/ e.g. assets/annual_report_2024.pdf",
    )
    cover_image = models.ImageField(
        upload_to='uploads/annual_reports/covers/',
        blank=True,
        null=True,
        help_text="Custom Front Cover image for this specific report (overrides global setting)",
    )
    back_image = models.ImageField(
        upload_to='uploads/annual_reports/backs/',
        blank=True,
        null=True,
        help_text="Custom Back Cover image for this specific report (overrides global setting)",
    )
    order = models.PositiveIntegerField(
        default=0,
        help_text="Sort order in the selector dropdown (ascending)",
    )
    is_active = models.BooleanField(
        default=True,
        help_text="Check to display in the flipbook reader",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'id']
        verbose_name = "Annual Report"
        verbose_name_plural = "Annual Reports"

    def __str__(self):
        return self.title
```

Run migrations:
```bash
python manage.py makemigrations
python manage.py migrate
```

---

### 3. STEP 2: DJANGO ADMIN CONFIGURATION (`admin.py`)

Register the models in your app's `admin.py` with live image previews and safe HTML:

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
            'description': (
                'Configure the default Front and Back Cover images for all publications in the 3D Flipbook. '
                'If an individual report does not have a custom cover image uploaded, these settings will be used.'
            ),
            'fields': (
                'default_cover_image',
                'cover_preview',
                'default_back_image',
                'back_preview',
                'updated_at',
            ),
        }),
    )

    def has_add_permission(self, request):
        return not AnnualReportSetting.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    @admin.display(description="Default Front Cover")
    def cover_thumbnail(self, obj):
        if obj.default_cover_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); object-fit: cover;" />', obj.default_cover_image.url)
        return mark_safe('<span style="color: #888;">Default Static Cover</span>')

    @admin.display(description="Default Back Cover")
    def back_thumbnail(self, obj):
        if obj.default_back_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); object-fit: cover;" />', obj.default_back_image.url)
        return mark_safe('<span style="color: #888;">Classic Gilded Binding</span>')

    @admin.display(description="Current Front Cover Preview")
    def cover_preview(self, obj):
        if obj.default_cover_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); display: block; margin-top: 6px;" />', obj.default_cover_image.url)
        return mark_safe('<div style="color: #777; font-style: italic; padding: 6px 0;">Currently using default static photo cover. Upload a new image above to override globally.</div>')

    @admin.display(description="Current Back Cover Preview")
    def back_preview(self, obj):
        if obj.default_back_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); display: block; margin-top: 6px;" />', obj.default_back_image.url)
        return mark_safe('<div style="color: #777; font-style: italic; padding: 6px 0;">Currently using classic gilded leather back cover. Upload an image above to use a custom photo hardcover back.</div>')


@admin.register(AnnualReport)
class AnnualReportAdmin(admin.ModelAdmin):
    list_display = ('title', 'year', 'order', 'cover_thumbnail', 'back_thumbnail', 'is_active', 'updated_at')
    list_editable = ('order', 'is_active')
    list_filter = ('is_active', 'year')
    search_fields = ('title', 'year')
    ordering = ('order', 'id')
    readonly_fields = ('cover_preview', 'back_preview', 'created_at', 'updated_at')
    fieldsets = (
        ('Publication Details', {
            'fields': ('title', 'year', 'order', 'is_active'),
        }),
        ('PDF Publication File', {
            'description': 'Upload a PDF file directly, or enter an existing static asset path.',
            'fields': ('pdf_file', 'pdf_asset_path'),
        }),
        ('Custom Covers (Front & Back)', {
            'description': (
                'Upload custom front and/or back cover images for this specific publication. '
                'If left blank, the global flipbook cover settings will be used automatically.'
            ),
            'fields': (
                'cover_image',
                'cover_preview',
                'back_image',
                'back_preview',
            ),
        }),
        ('Timestamps', {
            'classes': ('collapse',),
            'fields': ('created_at', 'updated_at'),
        }),
    )

    @admin.display(description="Front Cover")
    def cover_thumbnail(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); object-fit: cover;" />', obj.cover_image.url)
        return mark_safe('<span style="color: #888;">(Global Default)</span>')

    @admin.display(description="Back Cover")
    def back_thumbnail(self, obj):
        if obj.back_image:
            return format_html('<img src="{}" style="height: 50px; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); object-fit: cover;" />', obj.back_image.url)
        return mark_safe('<span style="color: #888;">(Global Default)</span>')

    @admin.display(description="Front Cover Preview")
    def cover_preview(self, obj):
        if obj.cover_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); display: block; margin-top: 6px;" />', obj.cover_image.url)
        return mark_safe('<div style="color: #777; font-style: italic; padding: 6px 0;">No custom front cover uploaded. Uses global default flipbook cover.</div>')

    @admin.display(description="Back Cover Preview")
    def back_preview(self, obj):
        if obj.back_image:
            return format_html('<img src="{}" style="max-height: 220px; border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.25); display: block; margin-top: 6px;" />', obj.back_image.url)
        return mark_safe('<div style="color: #777; font-style: italic; padding: 6px 0;">No custom back cover uploaded. Uses global default back cover.</div>')
```

---

### 4. STEP 3: VIEWS (`views.py`)

In your views file:

```python
from django.shortcuts import render
from django.conf import settings
from .models import AnnualReport, AnnualReportSetting


def annual_reports(request):
    settings_obj = AnnualReportSetting.get_settings()
    default_cover = settings_obj.default_cover_image.url if settings_obj.default_cover_image else f"{settings.STATIC_URL}assets/oyster_annual_report_cover.jpg"
    default_back = settings_obj.default_back_image.url if settings_obj.default_back_image else ""

    db_reports = AnnualReport.objects.filter(is_active=True).order_by('order', 'id')
    reports_list = []
    for r in db_reports:
        # Determine PDF URL (uploaded file or static asset)
        if r.pdf_file:
            pdf_url = r.pdf_file.url
        elif r.pdf_asset_path:
            pdf_url = f"{settings.STATIC_URL}{r.pdf_asset_path}"
        else:
            pdf_url = ""

        # Determine Cover URL (report-specific or global default)
        cover_url = r.cover_image.url if r.cover_image else default_cover

        # Determine Back Cover URL (report-specific or global default)
        back_url = r.back_image.url if r.back_image else default_back

        reports_list.append({
            'id': r.id,
            'title': r.title,
            'year': r.year,
            'pdf_url': pdf_url,
            'cover_url': cover_url,
            'back_url': back_url,
        })

    return render(request, 'reports/annual_reports.html', {
        'reports': reports_list,
        'default_cover_url': default_cover,
        'default_back_url': default_back,
    })
```

---

### 5. STEP 4: URLS & MEDIA SERVING (`urls.py`)

In your project's root `urls.py`:

```python
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('reports.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

In `settings.py`, make sure:
```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

### 6. STEP 5: TEMPLATE & CLIENT-SIDE RENDERING (`annual_reports.html`)

In `templates/reports/annual_reports.html`:

```html
{% extends 'base.html' %}
{% load static %}

{% block extra_css %}
<!-- PDF Flipbook CSS -->
<link rel="stylesheet" href="{% static 'css/flipbook.css' %}">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
{% endblock %}

{% block content %}
<div class="flipbook-wrapper">
  <!-- Dynamic Publication Selector (Admin-Controlled) -->
  <div class="controls">
    <label for="pdf-selector"><strong>Select Publication:</strong></label>
    <select id="pdf-selector">
      {% for rep in reports %}
      <option value="{{ rep.pdf_url }}" 
              data-id="{{ rep.id }}"
              data-title="{{ rep.title }}"
              data-cover="{{ rep.cover_url }}" 
              data-back="{{ rep.back_url }}"
              {% if forloop.last %}selected{% endif %}>
        {{ rep.title }}
      </option>
      {% empty %}
      <option value="{% static 'assets/default.pdf' %}" 
              data-title="Annual Report"
              data-cover="{% static 'assets/oyster_annual_report_cover.jpg' %}" 
              data-back="" 
              selected>
        Annual Report
      </option>
      {% endfor %}
    </select>
  </div>

  <!-- Loading State -->
  <div id="loading-indicator">
    <div class="spinner-border text-primary" role="status"></div>
    <span>Rendering pages... (<span id="loading-progress">0%</span>)</span>
  </div>

  <!-- Zoom Controls -->
  <div class="zoom-controls" id="zoom-controls">
    <button id="btn-zoom-out" title="Zoom Out"><i class="bi bi-zoom-out"></i></button>
    <span class="zoom-level-indicator" id="zoom-level-text">100%</span>
    <button id="btn-zoom-in" title="Zoom In"><i class="bi bi-zoom-in"></i></button>
    <button id="btn-zoom-reset" title="Reset Zoom"><i class="bi bi-arrow-counterclockwise"></i></button>
  </div>

  <!-- 3D Book Container -->
  <div id="book-container">
    <button id="float-prev-btn" class="flip-arrow-btn btn-prev-arrow" title="Previous Page"><i class="bi bi-chevron-left"></i></button>
    <button id="float-next-btn" class="flip-arrow-btn btn-next-arrow" title="Next Page"><i class="bi bi-chevron-right"></i></button>
    <div id="book-centering-wrapper">
      <div class="flip-book" id="book"></div>
    </div>
  </div>

  <!-- Bottom Navigation -->
  <div class="navigation" id="flipbook-controls">
    <button id="btn-first" title="First Page"><i class="bi bi-chevron-bar-left"></i></button>
    <button id="prev-btn" title="Previous Page"><i class="bi bi-chevron-left"></i></button>
    <div class="page-counter">
      <input type="number" id="page-input" value="1" min="1" />
      <span> / <span id="total-pages">1</span></span>
    </div>
    <button id="next-btn" title="Next Page"><i class="bi bi-chevron-right"></i></button>
    <button id="btn-last" title="Last Page"><i class="bi bi-chevron-bar-right"></i></button>
  </div>
</div>
{% endblock %}

{% block extra_js %}
<!-- PDF.js & StPageFlip -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js"></script>
<script src="{% static 'js/flipbook.js' %}"></script>
{% endblock %}
```

---

Please adapt this into my existing Django project:
1. Identify the appropriate app for the models and views.
2. Put `flipbook.css` into my `static/css/` directory and `flipbook.js` into `static/js/`.
3. Wire up the models, admin, views, and templates.
4. Verify by running `python manage.py makemigrations && python manage.py migrate` and testing in the browser.
```
