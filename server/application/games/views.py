from django.db.models import Count, F
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet 
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from .models import Game
from .serializers import GameSerializer, NewAnnounceSerializer


class GameViewSet(ReadOnlyModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.annotate(
            ads_count=Count(F('announcements'))
        )

    @action(
        detail=False, methods=['POST'], 
        permission_classes=[IsAuthenticated]
    )
    def add(self, request):
        kwargs = {
            'data': request.data,
            'context': self.get_serializer_context()
        }
        serializer = NewAnnounceSerializer(**kwargs)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

