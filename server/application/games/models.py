from django.db import models
from discordauth.models import User
from games.managers import AnnouncementManager


class Weekday(models.Model):
    name = models.CharField(max_length=3, unique=True)

    def __str__(self):
        return self.name


class Game(models.Model):
    name = models.CharField(max_length=128)
    image = models.ImageField(upload_to='games/', blank=True, null=True)
    banner = models.ImageField(upload_to='games/', blank=True, null=True)
    image_asset = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name


class Announcement(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nickname = models.CharField(max_length=100)
    play_since = models.IntegerField()
    play_weekdays = models.ManyToManyField(Weekday)
    play_period_start = models.TimeField()
    play_period_end = models.TimeField()
    voice_chat = models.BooleanField(default=False)
    objects = AnnouncementManager()

    def __str__(self):
        return f'{self.game} - ({self.user.gamer_tag})'

    class Meta:
        default_related_name = 'announcements'

