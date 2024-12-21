from hcenter.models import *
from hcenter.api.serializers import *
from rest_framework.viewsets import ReadOnlyModelViewSet
from rest_framework.response import Response
from rest_framework import filters
from django.db.models import Q

# parent viewsets
class BannerMainViewSet(ReadOnlyModelViewSet):
    queryset = BannerMain.objects.filter(is_active=True).order_by('-id')[:1]
    serializer_class = BannerMainSerializer

class SideBannerViewSet(ReadOnlyModelViewSet):
    queryset = SideBanner.objects.filter(is_active=True).order_by('-id')[:1]
    serializer_class = SideBannerSerializer

class CategoryViewSet(ReadOnlyModelViewSet):
    queryset = Category.objects.filter(is_active=True, is_publish = True).order_by('-id')
    serializer_class = CategorySerializer

class ArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True).order_by('-id')
    serializer_class = ArticleSerializer
    search_fields = ['title_tm', 'title_ru', 'title_en']
    filter_backends = [filters.SearchFilter]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1  # Increment views count
        instance.save()  # Save the updated views count
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


# child viewsets
class MarqueArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, is_marquee= True).order_by('-id')[:8]
    serializer_class = ArticleSerializer

class MainArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="mainar").order_by('-id')[:1]
    serializer_class = ArticleSerializer

class FourArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="fourar").order_by('-id')[:4]
    serializer_class = ArticleSerializer

class MultimediaArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="multimedia").order_by('-id')[:4]
    serializer_class = ArticleSerializer

class HomeUniverArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="univer").order_by('-id')[:6]
    serializer_class = ArticleSerializer

class HomeVacationalArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="vacational").order_by('-id')[:6]
    serializer_class = ArticleSerializer

class UniverArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="univer").order_by('-id')
    serializer_class = ArticleSerializer

class VacationalArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="vacational").order_by('-id')
    serializer_class = ArticleSerializer

class LyceeArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="lycee").order_by('-id')
    serializer_class = ArticleSerializer

class OfficialArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="official").order_by('-id')[:8]
    serializer_class = ArticleSerializer

class DigitalArticlesViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(is_active=True, is_publish = True, typear="digital").order_by('-id')
    serializer_class = ArticleSerializer

class ArticlesViaTypearViewSet(ReadOnlyModelViewSet):
    serializer_class = ArticleSerializer
    def get_queryset(self):
        typear = self.kwargs.get('typear')  # Assuming 'category' is passed in the URL
        return Articles.objects.filter(is_active=True, is_publish=True, typear=typear).order_by('-id')

class ArticlesViaCategoryViewSet(ReadOnlyModelViewSet):
    serializer_class = ArticleSerializer

    def get_queryset(self):
        category = self.kwargs.get('category')  # Assuming 'category' is passed in the URL
        return Articles.objects.filter(is_active=True, is_publish=True, 
                category__name_en=category).order_by('-id')[:10]

class MediasViewSet(ReadOnlyModelViewSet):
    queryset = Medias.objects.filter(is_active=True, is_publish = True).order_by('-id')
    serializer_class = MediasSerializer

class AllNewsViewSet(ReadOnlyModelViewSet):
    queryset = Articles.objects.filter(
        is_active=True,
        is_publish=True
    ).filter(
        Q(typear='news') |
        Q(typear='official') |
        Q(typear='uni_news') |
        Q(typear='vac_news') |
        Q(typear='lyc_news') |
        Q(typear='fourar') |
        Q(typear='mainar') |
        Q(typear='news_laws')
    ).order_by('-id')

    serializer_class = ArticleSerializer

class LawsViewSet(ReadOnlyModelViewSet):
    queryset = Laws.objects.filter(is_active=True, is_publish = True).order_by('-id')
    serializer_class = LawsSerializer
    search_fields = ['title_tm', 'title_ru', 'title_en']
    filter_backends = [filters.SearchFilter]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1  # Increment views count
        instance.save()  # Save the updated views count
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class DocsViewSet(ReadOnlyModelViewSet):
    queryset = Docs.objects.filter(is_active=True, is_publish = True).order_by('-id')
    serializer_class = DocssSerializer
    search_fields = ['title_tm', 'title_ru', 'title_en']
    filter_backends = [filters.SearchFilter]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1  # Increment views count
        instance.save()  # Save the updated views count
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class VacancyViewSet(ReadOnlyModelViewSet):
    queryset = Vacancy.objects.filter(is_active=True, is_publish = True).order_by('-id')
    serializer_class = VacanciesSerializer
    search_fields = ['title_tm', 'title_ru', 'title_en']
    filter_backends = [filters.SearchFilter]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += 1  # Increment views count
        instance.save()  # Save the updated views count
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
