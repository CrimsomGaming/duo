from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import CustomUserManager
# Create your models here.


class User(AbstractBaseUser):
    id = models.BigIntegerField(unique=True, primary_key=True)
    username = models.CharField(max_length=32)
    email = models.EmailField(max_length=255)
    global_name = models.CharField(max_length=64, null=True, blank=True)
    avatar = models.CharField(max_length=32)
    discriminator = models.CharField(max_length=4)
    password = None
    objects = CustomUserManager()
    
    USERNAME_FIELD = "id"
    REQUIRED_FIELDS = ()

    def __str__(self):
        return self.gamer_tag

    @property
    def gamer_tag(self):
        gamer_tag = f'{self.username}#{self.discriminator}'
        return gamer_tag

