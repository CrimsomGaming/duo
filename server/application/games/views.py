from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet 
from rest_framework.decorators import api_view, permission_classes
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
        user = self.request.user
        return  Game.objects.all_with_ann_count(user).order_by('-ann_count')   

    def get_serialized_game(self):
        game = self.get_object()
        return self.get_serializer(game)
    
    def get_serialized_annoucements(self):
        game = Game.objects.get(id=self.kwargs.get('pk'))
        ann_info = (game, self.request.user)
        anns = Announcement.objects.order_by_score(*ann_info)
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


@api_view(http_method_names=['POST'])
@permission_classes([IsAuthenticated])
def announcement_view(request):
    context = {'request': request}
    serializer = NewAnnounceSerializer(data=request.data, context=context)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

