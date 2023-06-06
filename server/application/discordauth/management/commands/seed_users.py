from django.core.management.base import BaseCommand
from discordauth.models import User
from random import choice


class Command(BaseCommand):
    help = "seed database with users for testing and development."

    def handle(self, *args, **options):
        self.stdout.write('Deleting users')
        self.clear_users()
        self.create_users()
        self.stdout.write('\nDone')

    def clear_users(self):
        non_superusers = User.objects.exclude(
            is_superuser=True, 
            is_staff=True
        )
        for user in non_superusers.iterator():
            user.delete()
            self.stdout.write('.', ending='')

    def create_users(self):
        usernames = [
                "midnight", "uzumakinho", "jhon", "pedroUchiha",
                "ElisaO2tsutsuki", "TiodoRamenTemRinegan", "roberta", "0"
                "Pedroferreirajulianotorresdenãoseioquelá"
            ]

        users = list()
        for i in range(1, 30+1):
            i = str(i)
            username = choice(usernames)
            users.append(
                User(
                    id=int(i*5), # 99999
                    username=username,
                    email=f'{username}@email.com',
                    avatar=f'{username[:32]}',
                    discriminator=str(i*4)[:4], # 1111
                    password='0000',
                )
            )
            self.stdout.write('.', ending='')
        User.objects.bulk_create(users)

