from datetime import time
from django.test import TestCase
from games.models import Game, Weekday, Announcement
from discordauth.models import User
# Create your tests here.


class GameTestCase(TestCase):
    def test_string_representation_for_game(self):
        game = Game.objects.create(name='Test Game')
        self.assertEqual(str(game), 'Test Game')


class WeekdayTestCase(TestCase):
    def test_string_representation_for_weekday(self):
        weekday = Weekday.objects.create(name='MON')
        self.assertEqual(str(weekday), 'MON')


class AnnouncementTestCase(TestCase):
    def setUp(self):
        self.game = Game.objects.create(name='Test Game')
        self.weekday = Weekday.objects.create(name='MON')
        self.user = User.objects.create_user({
            'id': 999999,
            'username': 'someusername',
            'email': 'hello@world.com',
            'global_name': None,
            'avatar': 'atavar',
            'discriminator': '0000'
        })

    def test_string_representation_for_announce(self):
        ann = Announcement.objects.create(
            user=self.user,
            game=self.game,
            nickname='tester',
            play_period_start=time(hour=7),
            play_period_end=time(hour=10),
            play_since=1,
        )
        self.assertEqual(str(ann), 'Test Game - (someusername#0000)')

