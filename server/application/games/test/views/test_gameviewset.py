from datetime import time
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from games.models import Game, User, Announcement, Weekday
# Create your tests here.


class GameViewSetTestCase(APITestCase):
    def setUp(self):
        self.url = reverse('games-list')
        self.url_detail = reverse('games-detail', kwargs={'pk': 1})
        self.url_add = reverse('games-add')
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

    def _create_user(self):
        user_data = {
            'id': 999999,
            'username': 'someusername',
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

    def test_unauthenticated_users_cant_add_announces(self):
        r = self.client.post(self.url_add, data={})
        self.assertEqual(r.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_add_new_announcements_success(self):
        self.client.force_authenticate(user=self.user)
        r = self.client.post(self.url_add, data=self.ann_data)
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Weekday.objects.count(), 2)
        self.assertEqual(Announcement.objects.count(), 1)


    def test_add_new_announcements_fail_field_errors(self):
        self.client.force_authenticate(user=self.user)
        self.ann_data['game_id'] = 100
        self.ann_data['play_since'] = -1
        self.ann_data['play_weekdays'] = ['AAA']

        r = self.client.post(self.url_add, data=self.ann_data)
        self.assertEqual(r.data['game_id'][0], 'Jogo inexistente.')
        self.assertEqual(
                r.data['play_weekdays'][0], '"AAA" não é um dia válido.')
        self.assertEqual(r.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_add_new_announcements_fail_non_field_errors(self):
        self.client.force_authenticate(user=self.user)
        self.ann_data['play_period_start'] = time(12)
        self.ann_data['play_period_end'] = time(8)

        r = self.client.post(self.url_add, data=self.ann_data)
        self.assertEqual(
            r.data['non_field_errors'][0], 
            'O horário final é maior que o inicial.'
        )

