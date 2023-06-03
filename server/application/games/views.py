from django.db.models import Count, F
from rest_framework.viewsets import ReadOnlyModelViewSet 
from .models import Game
from .serializers import GameSerializer


class GameViewSet(ReadOnlyModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.annotate(
            ads_count=Count(F('announcements'))
        )

