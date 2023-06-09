from rest_framework.routers import DefaultRouter
from .views import GameViewSet


router = DefaultRouter(trailing_slash=False)
router.register('games', GameViewSet, 'games')
urlpatterns = router.urls

