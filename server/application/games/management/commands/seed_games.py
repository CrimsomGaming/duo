import os, random
from datetime import time
from django.core.management.base import BaseCommand
from django.core.files.uploadedfile import SimpleUploadedFile
from games.models import *
from application.settings import BASE_DIR
from itertools import product


WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

game_img_dir = 'games/management/commands/images/'
GAME_BANNERS_DIR = os.path.join(BASE_DIR, game_img_dir)


class Command(BaseCommand):
    def handle(self, *args, **kwargs):
        self.clear_games_models()
        self.stdout.write('Creating games...')
        self.create_games()
        self.stdout.write('Creating weekdays...')
        self.create_weekdays()
        self.stdout.write('Adding announcements...')
        self.create_announcements()
        self.stdout.write('Done')

    def clear_games_models(self):
        for game in Game.objects.iterator():
            game.delete()

        for weekday in Weekday.objects.iterator():
            weekday.delete()

    def create_games(self):
        game_data_list = [
            ['League Of Legends', 'lol.jpg'],
            ['Valorant', 'vava.jpg'], 
            ['Counter-Strike: Global Offensive', 'csgo.jpg'],
            ['Fortnite', 'ft.png'],
            ['Minecraft: Java Edition', 'minejar.png'],
            ['Minecraft: Bedrock Edition', 'minebed.png'],
            ['Call of Duty: Warzone', 'codwar.jpeg'],
            ['Call of Duty: Mobile', 'codmob.jpg'],
            ['Fifa', 'fifa.jpg'],
            ['Dota 2', 'd2.jpg'],
        ]
        games = list()
        for name, img_f_name in game_data_list:
            img_kwargs = {
                'name': img_f_name,
                'content_type': img_f_name.split('.')[-1],
                'content': open(GAME_BANNERS_DIR+img_f_name, 'rb').read()
            }
            image = SimpleUploadedFile(**img_kwargs)
            games.append(Game(name=name, image=image))
        Game.objects.bulk_create(games)

    def create_weekdays(self):
        weekdays = [Weekday(name=day) for day in WEEKDAYS]
        Weekday.objects.bulk_create(weekdays)

    def create_announcements(self):
        ann_list = list()
        products = product(User.objects.all()[:10], Game.objects.all()[:5])
        for user, game in products:
            start, end = (random.randint(0, 12), random.randint(0, 11))
            ann_list.append(Announcement(
                game=game,
                user=user,
                nickname=f'{user.username}{start}{end}',
                play_since=random.randint(0, 10),
                play_period_start=time(start),
                play_period_end=time(start+end),
                voice_chat=random.choice([True, False])
            ))
        Announcement.objects.bulk_create(ann_list)
        
        # Add 4 days to each ann
        ann_products = product(Announcement.objects.iterator(), range(4)) 
        for ann, _ in ann_products:
            weekday = Weekday.objects.get(name=random.choice(WEEKDAYS))
            ann.play_weekdays.add(weekday)

