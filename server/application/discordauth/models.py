from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager
# Create your models here.


class User(AbstractBaseUser):
    id = models.BigIntegerField(unique=True, primary_key=True)
    username = models.CharField(max_length=128)
    email = models.EmailField(max_length=255)
    global_name = models.CharField(max_length=64, null=True, blank=True)
    avatar = models.CharField(max_length=32)
    discriminator = models.CharField(max_length=4)
    password = models.CharField(max_length=128, null=True, blank=True)
    objects = CustomUserManager()

    admin_username = models.CharField(max_length=20, unique=True, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = "admin_username"
    REQUIRED_FIELDS = ["id", "password"]

    def __str__(self):
        return self.gamer_tag

    def has_perm(self, perm, obj=None):
        return self.is_staff

    def has_module_perms(self, app_label):
        return self.is_staff

    @property
    def gamer_tag(self):
        gamer_tag = f'{self.username}#{self.discriminator}'
        return gamer_tag

    @property
    def image(self):
        return (
            f'https://cdn.discordapp.com/avatars/{self.id}/{self.avatar}'
        )

