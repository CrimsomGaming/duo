from typing import Dict
from datetime import time
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework.response import Response
from discordauth.models import User
from games.models import Announcement, Game, Weekday


class AnnouncementViewTestCase(APITestCase):
    url: str = reverse('ann-view')    
    
    def setUp(self) -> None:
        self.game = Game.objects.create(name='League of Legends')
        self.ann_data: Dict = {
            'game_id': 1,
            'nickname': 'testnickname',
            'play_since': 1,
            'play_weekdays': ['SAT', 'sun'],
            'play_period_start': time(8),
            'play_period_end': time(12),
            'voice_chat': True
        }
        user_data: Dict = {
            'id': 1,
            'username': 'username',
            'email': 'hello@world.com',
            'global_name': None,
            'avatar': 'atavar',
            'discriminator': '0000'
        }
        self.user: User = User.objects.create_user(user_data)


    def test_not_authorized(self) -> None:
        r: Response = self.client.post(self.url)
        self.assertEqual(r.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_method_not_allowed(self) -> None:
        self.client.force_authenticate(self.user)
        r: Response =  self.client.get(self.url)
        self.assertEqual(r.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_bad_request(self) -> None:
        self.client.force_authenticate(self.user)
        r: Response = self.client.post(self.url)
        self.assertEqual(r.status_code, status.HTTP_400_BAD_REQUEST)

    def test_post_request_create_ann(self) -> None:
        self.client.force_authenticate(self.user)
        r: Response = self.client.post(self.url, self.ann_data)
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Announcement.objects.count(), 1)
        self.assertEqual(Weekday.objects.count(), 2)

    def test_post_request_update_ann(self) -> None:
        # Create an Announcement
        self.ann_data.pop('play_weekdays')
        Announcement.objects.create(**self.ann_data, user=self.user)
        self.assertEqual(Announcement.objects.count(), 1)
        
        # update request
        self.client.force_authenticate(self.user)
        self.ann_data['play_weekdays'] = ['sat', 'sun']
        r: Response = self.client.post(self.url, self.ann_data)
        self.assertEqual(r.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Announcement.objects.count(), 1)
        self.assertEqual(Weekday.objects.count(), 2)

    def test_fail_field_errors(self) -> None:
        self.client.force_authenticate(user=self.user)
        self.ann_data['game_id'] = 100
        self.ann_data['play_since'] = -1
        self.ann_data['play_weekdays'] = ['AAA']

        r: Response = self.client.post(self.url, data=self.ann_data)
        self.assertEqual(r.data['game_id'][0], 'Jogo inexistente.')
        self.assertEqual(
            r.data['play_weekdays'][0], '"AAA" não é um dia válido.'
        )
        self.assertEqual(r.status_code, status.HTTP_400_BAD_REQUEST)
 
    def test_fail_non_field_errors(self) -> None:
        self.client.force_authenticate(user=self.user)
        self.ann_data['play_period_start'] = time(12)
        self.ann_data['play_period_end'] = time(8)

        r: Response = self.client.post(self.url, data=self.ann_data)
        self.assertEqual(
            r.data['non_field_errors'][0], 
            'O horário final é maior que o inicial.'
        )

