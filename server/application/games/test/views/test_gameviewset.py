from datetime import time
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from games.models import Game, User, Announcement


class GameViewSetTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('games-list')
        self.url_detail = reverse('games-detail', kwargs={'pk': 1})
        self._create_games()
        self.user = self._create_user()
        self.ann_data = {
            'game_id': 1,
            'nickname': 'testnickname',
            'play_since': 1,
            'play_weekdays': ['SAT', 'sun'],
            'play_period_start': time(8),
            'play_period_end': time(12),
            'voice_chat': True
        }
    
    def _create_games(self):
        games = [Game(name=f'Game {i}') for i in range(0, 10)]
        return Game.objects.bulk_create(games)

    def _create_user(self, id=999999, username='someusername'):
        user_data = {
            'id': id,
            'username': username,
            'email': 'hello@world.com',
            'global_name': None,
            'avatar': 'atavar',
            'discriminator': '0000'
        }
        return User.objects.create_user(user_data)

    def test_get_should_return_all_games(self):
        """
        On GET shall return all games with its number of announcements
        """
        self.ann_data.pop('play_weekdays')
        Announcement.objects.create(**self.ann_data, user=self.user)

        r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(len(r.data), 10)
        self.assertEqual(r.data[0].get('ads_count'), 1)
    
    def test_get_should_not_count_the_authenticated_users_ann(self):
        """
        Even with one announcement in the first game, should return ads_count
        as 0 once the authenticated user's announcement shouldn't count.
        """
        self.ann_data.pop('play_weekdays')
        Announcement.objects.create(**self.ann_data, user=self.user)

        self.client.force_authenticate(self.user)
        r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(len(r.data), 10)
        self.assertEqual(r.data[0].get('ads_count'), 0)
        
    def test_get_should_make_only_one_conn(self):
        with self.assertNumQueries(1):
            r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)

    def test_detail(self):
        r = self.client.get(self.url_detail)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
    
    def test_detail_with_authenticated_user(self):
        self.client.force_authenticate(self.user)
        r = self.client.get(self.url_detail)
        self.assertEqual(r.status_code, status.HTTP_200_OK)

