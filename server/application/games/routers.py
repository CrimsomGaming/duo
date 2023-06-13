from django.urls import re_path
from rest_framework.routers import DefaultRouter
from .views import GameViewSet, announcement_view


ann_url = re_path('^announcements/?$', announcement_view, name='ann-view')

router = DefaultRouter(trailing_slash=False)
router.register('games', GameViewSet, 'games')

urlpatterns = router.urls + [ann_url]

