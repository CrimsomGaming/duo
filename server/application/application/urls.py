from django.contrib import admin
from django.urls import path, include
from games.routers import router as games

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('discordauth.urls')),
    path('', include(games.urls))
]

