from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken
from discordauth.models import User


class RefreshTokenAPIView(APITestCase):
    """
    Testes para garantir que os tokens gerados manualmente estão 
    funcionando corretamente...
    """
    url = reverse('refresh')

    def setUp(self) -> None:
        user_data = {
            'id': 999999,
            'username': 'someusername',
            'email': 'hello@world.com',
            'global_name': None,
            'avatar': 'atavar',
            'discriminator': '0000'
        }
        user = User.objects.create_user(user_data)
        self.refresh_token = str(RefreshToken().for_user(user))

    def test_view_shall_return_tokens_on_valid_token(self):
        r = self.client.post(self.url, data={'refresh': self.refresh_token})
        self.assertEqual(r.status_code, status.HTTP_200_OK)
        self.assertEqual(list(r.data.keys()), ['access', 'refresh'])
    
    def test_view_shall_return_unauthorized_on_invalid_token(self):
        r = self.client.post(self.url, data={'refresh': 'fakeToken'})
        self.assertEqual(r.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_view_shall_return_unauthorized_on_used_tokens(self):
        self.client.post(self.url, data={'refresh': self.refresh_token})
        # Reutilizando o token
        r = self.client.post(self.url, data={'refresh': self.refresh_token})
        self.assertEqual(r.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(r.data.get('detail'), 'Token está na blacklist')

