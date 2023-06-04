from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    ads_count = serializers.IntegerField()

    class Meta:
        model = Game
        fields = ['id', 'name', 'image', 'ads_count']

