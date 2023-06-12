from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from .discord_conn import BaseDiscordConn, DiscordConn
# Create your views here.


class LoginAPIView(APIView):
    def get_tokens(self, user):
        token = RefreshToken().for_user(user)
        token['username'] = user.username
        token['user_image'] = user.image
        return (str(token), str(token.access_token))

    def post(self, request):
        code = request.data.get('code')
        discord_conn = DiscordConn(code)

        if discord_conn.is_valid:
            user = discord_conn.user
            refresh, access = self.get_tokens(user)
            return Response(
                {'refresh': refresh, 'access': access}, status.HTTP_200_OK
            )

        return Response(
            {"code": "Código inválido"}, status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request):
        discord_conn = BaseDiscordConn()
        return Response({
            'redirect_url':discord_conn.redirect_url
        })

