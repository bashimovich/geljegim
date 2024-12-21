from django.db import models
from django.utils.html import mark_safe
from django.contrib.contenttypes.fields import GenericForeignKey, GenericRelation
from django.contrib.contenttypes.models import ContentType
from ckeditor.fields import RichTextField

# Create your models here.
ARTICLE_TYPES = {
    "simple": "Simple Articles",
    "mainar": "Main Article",
    "fourar": "Four Articles",
    "multimedia": "Multimedia Articles",
    "univer": "Univer Articles",
    "vacational": "Vacational Articles",
    "lycee": "Lycee Articles",
    "news":"News",
    "official":"Oficiall News",
    "uni_news":"Univer News",
    "vac_news":"Vacational News",
    "lyc_news":"Lycee News",
    "news_laws":"Laws News",
    "digital":"Digitalization",
}

MEDIA_TYPES = {
    "video": "Video",
    "photo": "Photo",
}


class Image(models.Model):
    src = models.ImageField(upload_to="images")
    content_type = models.ForeignKey(
        ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    def img_preview(self):
        return mark_safe(f'<img src="{self.src.url}" width=70 height=70>')

class BannerMain(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    button_link = models.CharField(max_length=200, blank=False, null=False)
    images_for_web = GenericRelation('Image', blank=False, null=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Main Banner"

    def __str__(self):
        return self.name

class SideBanner(models.Model):
    name = models.CharField(max_length=100, blank=False, null=False)
    button_link = models.CharField(max_length=200, blank=False, null=False)
    images_for_web = GenericRelation('Image', blank=False, null=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Side Banner"

    def __str__(self):
        return self.name

class Category(models.Model):
    name_tm = models.CharField(max_length=100, blank=False, null=False)
    name_en = models.CharField(max_length=100, blank=False, null=False)
    name_ru = models.CharField(max_length=100, blank=False, null=False)

    is_publish = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Categories"

    def __str__(self):
        return self.name_tm

class Articles(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='articles', null=True)

    title_tm = models.CharField(max_length=200, blank=False, null=False)
    title_en = models.CharField(max_length=200, blank=False, null=False)
    title_ru = models.CharField(max_length=200, blank=False, null=False)
    typear = models.CharField(max_length=100, choices=ARTICLE_TYPES, default="simple")

    description_tm = RichTextField(null=True)
    description_en = RichTextField(null=True)
    description_ru = RichTextField(null=True)

    content_tm = RichTextField(null=True)
    content_en = RichTextField(null=True)
    content_ru = RichTextField(null=True)


    views = models.IntegerField(default=0)

    button_link = models.CharField(max_length=200, blank=False, null=False)

    images_for_web = GenericRelation('Image', blank=False, null=False)

    is_publish = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_marquee = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Articles"

    def __str__(self):
        return self.title_tm



class Medias(models.Model):
    title_tm = models.CharField(max_length=200, blank=False, null=False)
    title_en = models.CharField(max_length=200, blank=False, null=False)
    title_ru = models.CharField(max_length=200, blank=False, null=False)

    description_tm = RichTextField(null=True)
    description_en = RichTextField(null=True)
    description_ru = RichTextField(null=True)

    _type = models.CharField(max_length=100, choices=MEDIA_TYPES, default="photo")

    thumbnail = models.ImageField(upload_to='images/', null=False)

    images_for_web = GenericRelation('Image', blank=False, null=True)
    video = models.FileField(upload_to='videos/', blank=True, null=True)

    is_publish = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Medias"

    def __str__(self):
        return self.title_tm


class Laws(models.Model):
    title_tm = models.CharField(max_length=200, blank=False, null=False)
    title_en = models.CharField(max_length=200, blank=False, null=False)
    title_ru = models.CharField(max_length=200, blank=False, null=False)
    description_tm = RichTextField(null=True)
    description_en = RichTextField(null=True)
    description_ru = RichTextField(null=True)
    pdf = models.FileField(upload_to='pdfs/')
    views = models.IntegerField(default=0)
    is_publish = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Laws"

    def __str__(self):
        return self.title_tm

class Docs(models.Model):
    title_tm = models.CharField(max_length=200, blank=False, null=False)
    title_en = models.CharField(max_length=200, blank=False, null=False)
    title_ru = models.CharField(max_length=200, blank=False, null=False)
    description_tm = RichTextField(null=True)
    description_en = RichTextField(null=True)
    description_ru = RichTextField(null=True)
    docs = models.FileField(upload_to='docs/')
    views = models.IntegerField(default=0)
    is_publish = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Documents"

    def __str__(self):
        return self.title_tm

class Vacancy(models.Model):
    title_tm = models.CharField(max_length=200, blank=False, null=False)
    title_en = models.CharField(max_length=200, blank=False, null=False)
    title_ru = models.CharField(max_length=200, blank=False, null=False)
    vacancy_url = models.CharField(max_length=200, blank=False, null=False)
    views = models.IntegerField(default=0)
    is_publish = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name_plural = "Vacancies"

    def __str__(self):
        return self.title_tm
