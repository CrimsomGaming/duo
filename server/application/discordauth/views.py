import requests
from urllib import parse
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .models import User
# Create your views here.


class LoginAPIView(APIView):
    base_url = 'https://discord.com/api'

    def get_user_discord_tokens(self, code):
        data = {
            'client_id':settings.DISCORD_CLIENT_ID,
            'client_secret':settings.DISCORD_CLIENT_SECRET,
            'redirect_uri': settings.DISCORD_REDIRECT_URI,
            'code': code,
            'grant_type': 'authorization_code',
        }
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        url = f'{self.base_url}/v10/oauth2/token'
        r = requests.post(url, data=data, headers=headers)

        if r.status_code == 200:
            return r.json()
        return None
    
    def get_user_data(self, user_tokens):
        access_token = user_tokens.get('access_token')
        url = f'{self.base_url}/v10/users/@me'
        headers = {'Authorization': f'Bearer {access_token}'}
        r = requests.get(url, headers=headers)
        
        if r.status_code == 200:
            return r.json()
        return None

    def get_user(self, user_data):
        try:
            return User.objects.get(id=user_data['id'])
        except:
            return User.objects.create_user(user_data)
    
    def get_discord_redirect_url(self):
        client_id = f'client_id={settings.DISCORD_CLIENT_ID}'
        encoded_url = parse.quote(settings.DISCORD_REDIRECT_URI, safe="")
        redirect_uri = f'redirect_uri={encoded_url}'
        url = f'{self.base_url}/oauth2/authorize?{client_id}&'
        url += f'{redirect_uri}&response_type=code&scope=identify'
        return url

    #Methods
    def get(self, request):
        discord_redirect_url = self.get_discord_redirect_url()
        return Response({'redirect_url':discord_redirect_url})

    def post(self, request):
        code = request.data.get('code')
        user_tokens = self.get_user_discord_tokens(code)
        
        if user_tokens is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        user_data = self.get_user_data(user_tokens)
        user = self.get_user(user_data)
        refresh = RefreshToken().for_user(user)
        refresh['username'] = user.username
        refresh['user_image'] = user.image

        return Response(
            {'refresh': str(refresh),
             'access': str(refresh.access_token)}, 
            status=status.HTTP_200_OK)

