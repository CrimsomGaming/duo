from django.db.models import Count, F
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet 
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from .models import Game, Announcement
from .serializers import (
    GameSerializer, 
    NewAnnounceSerializer,
    AnnouncementListSerializer
)


class GameViewSet(ReadOnlyModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        return Game.objects.annotate(
            ads_count=Count(F('announcements'))
        )
    
    def get_serialized_game(self):
        game = self.get_object()
        return self.get_serializer(game)
    
    def get_serialized_annoucements(self):
        ann_info = (self.kwargs.get('pk'), self.request.user)
        anns = Announcement.objects.get_ordered_announcements(*ann_info)
        serializer = AnnouncementListSerializer(data=anns, many=True)
        serializer.is_valid()
        return serializer

    def retrieve(self, request, *args, **kwargs):
        game_serializer = self.get_serialized_game()
        ann_serializer = self.get_serialized_annoucements()
        
        return Response({
            'game': game_serializer.data,
            'announcements': ann_serializer.data
        })

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

