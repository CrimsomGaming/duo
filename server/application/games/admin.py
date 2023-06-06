from django.contrib import admin
from .models import Game, Announcement, Weekday


# Register your models here.
admin.site.register(Game)
admin.site.register(Announcement)
admin.site.register(Weekday)

