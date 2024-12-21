from django.contrib import admin
from .models import *
from django.contrib.contenttypes.admin import GenericTabularInline, GenericStackedInline
from django.utils.html import format_html, mark_safe, format_html_join

# Register your models here.

class WebImageInline(GenericStackedInline):
    model = Image

class BannerMainAdmin(admin.ModelAdmin):
    list_display = ( "get_images", )
    inlines = (WebImageInline, )
    model = BannerMain

    def get_images(self, obj):
        return format_html_join('\n', '<img src="/media/{}" width=60px height=60px>', ((i.src,) for i in obj.images_for_web.all()))

class SideBannerAdmin(admin.ModelAdmin):
    list_display = ( "get_images", )
    inlines = (WebImageInline, )
    model = SideBanner
    def get_images(self, obj):
        return format_html_join('\n', '<img src="/media/{}" width=60px height=60px>', ((i.src,) for i in obj.images_for_web.all()))

class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name_tm",)
    search_fields = ('name_tm', 'name_ru', 'name_en', )

class ArticlesAdmin(admin.ModelAdmin):
    list_display = ( "get_images", "title_tm", )
    list_filter = ("category",  "is_publish", "is_active", "is_marquee", "updated_at", "typear", )
    search_fields = ('title_tm', 'title_ru', 'title_en', )
    inlines = (WebImageInline, )
    model = Articles

    def get_images(self, obj):
        return format_html_join('\n', '<img src="/media/{}" width=60px height=60px>', ((i.src,) for i in obj.images_for_web.all()))

class MediasAdmin(admin.ModelAdmin):
    list_display = ( "get_images", "title_tm", )
    list_filter = ("is_publish", "is_active", "updated_at", )
    search_fields = ('title_tm', 'title_ru', 'title_en', )
    inlines = (WebImageInline, )
    model = Medias

    def get_images(self, obj):
        if obj.thumbnail:
            return format_html('<img src="{}" width="60" height="60" />', obj.thumbnail.url)
        return 'No Image'


class LawsAdmin(admin.ModelAdmin):
    list_display = ( "title_tm", )
    list_filter = ("is_publish", "is_active", "updated_at", )
    search_fields = ('title_tm', 'title_ru', 'title_en', )
    model = Laws

class DocsAdmin(admin.ModelAdmin):
    list_display = ( "title_tm", )
    list_filter = ("is_publish", "is_active", "updated_at", )
    search_fields = ('title_tm', 'title_ru', 'title_en', )
    model = Docs
        
class VacancyAdmin(admin.ModelAdmin):
    list_display = ( "title_tm", )
    list_filter = ("is_publish", "is_active", "updated_at", )
    search_fields = ('title_tm', 'title_ru', 'title_en', )
    model = Vacancy

admin.site.register(BannerMain, BannerMainAdmin)
admin.site.register(SideBanner, SideBannerAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Articles, ArticlesAdmin)
admin.site.register(Medias, MediasAdmin)
admin.site.register(Laws, LawsAdmin)
admin.site.register(Docs, DocsAdmin)
admin.site.register(Vacancy, VacancyAdmin)
