from django.contrib import admin
from django.urls import path, include
from games.routers import router as games
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('discordauth.urls')),
    path('', include(games.urls))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

