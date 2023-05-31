from django.contrib.auth.models import UserManager


class CustomUserManager(UserManager):
    def create_user(self, user_data):
        return self.create(
            id=user_data['id'],
            username=user_data['username'],
            global_name=user_data['global_name'],
            avatar=user_data['avatar'],
            discriminator=user_data['discriminator']
        )

