from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    ann_count = serializers.IntegerField()

    class Meta:
        model = Game
        fields = ['id', 'name', 'image', 'ann_count']

