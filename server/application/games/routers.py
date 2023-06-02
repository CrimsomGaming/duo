from rest_framework.routers import DefaultRouter
from .views import GameViewSet


router = DefaultRouter()
router.register('games', GameViewSet, 'games')
urlpatterns = router.urls

