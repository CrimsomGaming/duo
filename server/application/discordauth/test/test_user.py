from django.db import IntegrityError
from rest_framework.test import APITestCase
from discordauth.models import User


class UserModelTestCase(APITestCase):
    def setUp(self):
        self.default_user_data = {
            'id': 999999,
            'username': 'someusername',
            'email': 'hello@world.com',
            'global_name': None,
            'avatar': 'atavar',
            'discriminator': '0000'
        }

    def test_create_user(self):
        user = User.objects.create_user(self.default_user_data)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(user.pk, 999999)

    def test_create_user_with_useless_extra_data(self):
        useless_data = {
            'useless_data': 'i am useless :(', 
            'useless_data1': 'i am also useless :(',
            'useless_number': 000, 
            **self.default_user_data
        }
        user = User.objects.create_user(useless_data)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(user.pk, 999999)

    def test_create_user_without_id_shall_raise_error(self):
        user_data = self.default_user_data
        user_data['id'] = None
        with self.assertRaises(IntegrityError):
            user = User.objects.create_user(user_data)
    
    def test_user_string_representation(self):
        user = User.objects.create_user(self.default_user_data)
        self.assertEqual(str(user), 'someusername#0000')

    def test_user_image_property(self):
        user = User.objects.create_user(self.default_user_data)
        expected_url = (
            f'https://cdn.discordapp.com/avatars/999999/atavar'
        )
        self.assertEqual(user.image, expected_url)

