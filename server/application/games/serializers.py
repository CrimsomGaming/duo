from typing import List
from rest_framework import serializers
from .models import Announcement, Game, Weekday


class GameSerializer(serializers.ModelSerializer):
    ads_count = serializers.IntegerField(source='ann_count')

    class Meta:
        model = Game
        fields = ['id', 'name', 'image', 'ads_count', 'banner']


class NewAnnounceSerializer(serializers.Serializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    game_id = serializers.IntegerField()
    nickname = serializers.CharField()
    play_since = serializers.IntegerField(min_value=0)
    play_weekdays = serializers.ListField()
    play_period_start = serializers.TimeField()
    play_period_end = serializers.TimeField()
    voice_chat = serializers.BooleanField()
    
    def validate(self, data):
        if data.get('play_period_start') > data.get('play_period_end'):
            raise serializers.ValidationError(
                'O horário final é maior que o inicial.')
        return data

    def validate_game_id(self, game_id):
        if Game.objects.filter(id=game_id).exists():
            return game_id
        raise serializers.ValidationError('Jogo inexistente.')

    def validate_play_weekdays(self, weekdays):
        VALID_WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        for day in weekdays:
            day = day.upper()
            if day in VALID_WEEKDAYS:
                continue

            raise serializers.ValidationError(f'"{day}" não é um dia válido.')
        return weekdays

    def get_or_create_weekdays(self, weekdays: List[str]) -> List[Weekday]:
        """
        Pega ou cria dias baseado na lista de nomes recebidos
        para cada nome na lista retorna o primeiro argumento da 
        tupla de "get_or_create" que é uma instancia de Weekday 
        """
        return [Weekday.objects.get_or_create(name=f"{day_name.upper()}")[0]
                for day_name in weekdays]

    def save(self):
        data = dict(self.validated_data)
        weekdays = self.get_or_create_weekdays(data.pop('play_weekdays'))
        ann = Announcement.objects.create_or_update(**data)
        
        for weekday in Weekday.objects.iterator():
            try: ann.play_weekdays.remove(weekday)
            except: continue

        for weekday in weekdays:
            ann.play_weekdays.add(weekday)


class AnnouncementListSerializer(serializers.ModelSerializer):
    play_weekdays = serializers.StringRelatedField(many=True)
    user = serializers.StringRelatedField()

    class Meta:
        model = Announcement    
        fields = [
            'id',
            'user',
            'nickname', 
            'play_since', 
            'play_weekdays',
            'play_period_start',
            'play_period_end',
            'voice_chat',
        ]

