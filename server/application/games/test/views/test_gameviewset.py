from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from games.models import Game
# Create your tests here.


class GameViewSetTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('games-list')
        self.url_detail = reverse('games-detail', kwargs={'pk': 1})
        games = [Game(name=f'Game {i}') for i in range(0, 10)]
        Game.objects.bulk_create(games)
    
    def test_get_should_return_all_games(self):
        """
        On GET shall return all games with its number of announcements
        """
        r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(len(r.data), 10)

    def test_get_detail_should_return_a_game(self):
        r = self.client.get(self.url_detail)
        expected_data = {
            'id': 1,
            'name': 'Game 0',
            'image': None,
            'ads_count': 0
        }
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(dict(expected_data), r.data)

