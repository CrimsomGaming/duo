import os, random
from datetime import time
from itertools import product
from django.core.management.base import BaseCommand
from django.core.files.uploadedfile import SimpleUploadedFile
from games.models import *
from application.settings import BASE_DIR


WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

game_img_dir = 'games/management/commands/images/'
GAME_BANNERS_DIR = os.path.join(BASE_DIR, game_img_dir)


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument('--model', type=bool)

    def handle(self, *args, **kwargs):
        if kwargs.get('model'):
            self.stdout.write('Seeding games model only...')
            return self.create_games()

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

    def get_game_image_and_banner(self, imgs_f_data):
        return [
            SimpleUploadedFile(
                name=file_name,
                content_type=file_name.split('.')[-1],
                content=open(GAME_BANNERS_DIR+file_name, 'rb').read()
            ) for file_name in imgs_f_data
        ]

    def create_games(self):
        game_data_list = [
            ['League Of Legends', 'lol.jpg', 'lol_banner.png'],
            ['Valorant', 'vava.jpg', 'vava_banner.jpg'], 
            ['Counter-Strike: Global Offensive', 'csgo.jpg', 'csgo_banner.jpg'],
            ['Fortnite', 'ft.png', 'ft_banner.jpeg'],
            ['Minecraft: Java Edition', 'minejar.png', 'mine_banner.jpg'],
            ['Minecraft: Bedrock Edition', 'minebed.png', 'mine_banner.jpg'],
            ['Call of Duty: Warzone', 'codwar.jpeg', 'codwar_banner.jpg'],
            ['Call of Duty: Mobile', 'codmob.jpg', 'codmob_banner.png'],
            ['Fifa', 'fifa.jpg', 'fifa_banner.jpeg'],
            ['Dota 2', 'd2.jpg', 'd2_banner.png']
        ]
        games = list()
        for name, *imgs_f_data in game_data_list:
            image, banner = self.get_game_image_and_banner(imgs_f_data)
            games.append(Game(name=name, image=image, banner=banner))
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

