from io import StringIO
from django.test import TestCase
from django.core.management import call_command
from games.models import *


class SeedGamesTestCase(TestCase):
    def setUp(self):
        self.out = StringIO()
        call_command("seed_users", stdout=self.out)
    
    def get_game_models_count(self):
        return {
            'user': User.objects.count(),
            'game': Game.objects.count(),
            'weekday': Weekday.objects.count(),
            'ann': Announcement.objects.count(),
        }

    def test_command_working_on_empty_db(self):
        self.assertDictEqual(                                # Before running
            self.get_game_models_count(),
            {'user': 30, 'game':0, 'weekday': 0, 'ann': 0}
        )

        call_command("seed_games", stdout=self.out)
        self.assertDictEqual(
            self.get_game_models_count(),
            {'user':30, 'game':10, 'weekday': 7, 'ann': 50}
        )

    def test_command_should_allways_return_the_same_amount_of_data(self):
        call_command("seed_games", stdout=self.out)
        call_command("seed_games", stdout=self.out)
        self.assertDictEqual(
            self.get_game_models_count(),
            {'user':30, 'game':10, 'weekday': 7, 'ann': 50}
        )

