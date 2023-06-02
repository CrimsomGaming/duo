from datetime import time
from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Game, Weekday, Announcement
from discordauth.models import User
# Create your tests here.

class GameViewSetTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('games-list')
        games = [Game(name=f'Game {i}') for i in range(0, 10)]
        Game.objects.bulk_create(games)
    
    def test_get_should_return_all_games(self):
        """
        On GET shall return all games with its number of announcements
        """
        r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(len(r.data), 10)


class GenericModelTestCase(TestCase):

    def test_string_representation_for_game_model(self):
        game = Game.objects.create(name='Test Game')
        self.assertEqual(str(game), 'Test Game')

    def test_string_representation_for_weekday_model(self):
        weekday = Weekday.objects.create(name='MON')
        self.assertEqual(str(weekday), 'MON')
    
    def test_string_representation_for_announce_model(self):
        game = Game.objects.create(name='Test Game')
        weekday = Weekday.objects.create(name='MON')
        user = User.objects.create_user({
            'id': 999999,
            'username': 'someusername',
            'email': 'hello@world.com',
            'global_name': None,
            'avatar': 'atavar',
            'discriminator': '0000'
        })
        ann = Announcement.objects.create(
            user=user,
            game=game,
            nickname='tester',
            play_period_start=time(hour=7),
            play_period_end=time(hour=10),
            play_since=1,
        )
        self.assertEqual(str(ann), 'Test Game - (someusername#0000)')
        

