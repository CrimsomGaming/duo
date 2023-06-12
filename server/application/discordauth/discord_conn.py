import requests
from urllib import parse
from django.conf import settings
from .models import User

class BaseDiscordConn:
    base_url = 'https://discord.com/api'
    CLIENT_ID = settings.DISCORD_CLIENT_ID
    CLIENT_SECRET = settings.DISCORD_CLIENT_SECRET
    REDIRECT_URI = settings.DISCORD_REDIRECT_URI
    
    @property
    def redirect_url(self):
        client_id = f'client_id={self.CLIENT_ID}'
        encoded_url = parse.quote(self.REDIRECT_URI, safe="")
        redirect_uri = f'redirect_uri={encoded_url}'
        url = f'{self.base_url}/oauth2/authorize?{client_id}&{redirect_uri}'
        url += f'&response_type=code&scope=identify'
        return url


class DiscordConn(BaseDiscordConn):
    def __init__(self, code):
        self.code = code
        self._conn_tokens = self.get_discord_user_tokens()

    @property
    def is_valid(self):
        if self._conn_tokens is not None:
            return True
        return False

    @property
    def user(self):
        user_data = self.get_user_data()
        try:
            return User.objects.get(id=user_data['id'])
        except:
            return User.objects.create_user(user_data)
 

    def get_user_data(self):
        access_token = self._conn_tokens.get('access_token')
        url = f'{self.base_url}/v10/users/@me'
        headers = {'Authorization': f'Bearer {access_token}'}
        r = requests.get(url, headers=headers)
        
        if r.status_code == 200:
            return r.json()
        return None

    def get_discord_user_tokens(self):
        data = {
            'client_id': self.CLIENT_ID,
            'client_secret': self.CLIENT_SECRET,
            'redirect_uri': self.REDIRECT_URI,
            'code': self.code,
            'grant_type': 'authorization_code',
        }
        headers = {'Content-Type': 'application/x-www-form-urlencoded'}
        url = f'{self.base_url}/v10/oauth2/token'
        r = requests.post(url, data=data, headers=headers)

        if r.status_code == 200:
            return r.json()
        return None

