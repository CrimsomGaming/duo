from datetime import time
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from games.models import Game, User, Announcement, Weekday


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
        r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(len(r.data), 10)
    
    def test_get_should_make_only_one_conn(self):
        with self.assertNumQueries(1):
            r = self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_200_OK)

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
            r.data['play_weekdays'][0], '"AAA" não é um dia válido.'
        )
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
    
    def test_add_edit_annoucement(self):
        # Before any request
        self.client.force_authenticate(user=self.user)
        self.assertEqual(self.user.announcements.count(), 0)
        
        # After create request
        r = self.client.post(self.url_add, data=self.ann_data)
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.user.announcements.count(), 1)

        ann = Announcement.objects.get(game_id=1, user=self.user)
        self.assertEqual(ann.game_id, 1)
        self.assertEqual(ann.play_since, 1)
        
        # After update request
        self.ann_data['play_since'] = 42
        self.ann_data['play_weekdays'] = ['sat']
        r = self.client.post(self.url_add, data=self.ann_data)
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)
        self.assertEqual(self.user.announcements.count(), 1)
        
        ann_edited = Announcement.objects.get(game_id=1, user=self.user)
        self.assertEqual(ann_edited.game_id, 1)
        self.assertEqual(ann_edited.play_since, 42)
        self.assertEqual(ann_edited.play_weekdays.count(), 1)

    def test_add_detail(self):
        r = self.client.get(self.url_detail)
        self.assertEqual(r.status_code, status.HTTP_200_OK)
    
    def test_add_detail_with_authenticated_user(self):
        self.client.force_authenticate(self.user)
        r = self.client.get(self.url_detail)
        self.assertEqual(r.status_code, status.HTTP_200_OK)

