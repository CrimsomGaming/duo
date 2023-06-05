from django.contrib.auth.models import UserManager
from django.contrib.auth.hashers import make_password


class CustomUserManager(UserManager):
    def create_user(self, user_data):
        return self.create(
            id=user_data['id'],
            username=user_data['username'],
            global_name=user_data['global_name'],
            avatar=user_data['avatar'],
            discriminator=user_data['discriminator']
        )

    def create_superuser(self, id, admin_username, email=None, password=None):
        return self.create(
            is_staff=True,
            is_superuser=True,
            id=id,
            username=admin_username,
            admin_username=admin_username,
            discriminator='0000',
            password=make_password(password)
        )

