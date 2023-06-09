from django.urls import re_path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import LoginAPIView


urlpatterns = [
    re_path(r'^login/?$', LoginAPIView.as_view(), name='login'),
    re_path(r'^refresh/?$', TokenRefreshView.as_view(), name='refresh')
]

