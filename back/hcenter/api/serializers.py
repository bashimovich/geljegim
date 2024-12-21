from rest_framework import serializers
from hcenter.models import *

class ImageSerializer(serializers.ModelSerializer):
    src = serializers.ImageField()

    class Meta:
        model = Image
        fields = ("src",)

class BannerMainSerializer(serializers.ModelSerializer):
    images_for_web = ImageSerializer(many=True)

    class Meta:
        model = BannerMain
        fields = "__all__"

class SideBannerSerializer(serializers.ModelSerializer):
    images_for_web = ImageSerializer(many=True)

    class Meta:
        model = SideBanner
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name_tm', 'name_en', 'name_ru', )

class ArticleSerializer(serializers.ModelSerializer):
    images_for_web = ImageSerializer(many=True)
    category = CategorySerializer()

    class Meta:
        model = Articles
        fields = '__all__'

class MediasSerializer(serializers.ModelSerializer):
    images_for_web = ImageSerializer(many=True)
    class Meta:
        model = Medias
        fields = '__all__'


class LawsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laws
        fields = '__all__'

class DocssSerializer(serializers.ModelSerializer):
    class Meta:
        model = Docs
        fields = '__all__'

class VacanciesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vacancy
        fields = '__all__'
