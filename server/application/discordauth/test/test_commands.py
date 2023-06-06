from io import StringIO
from django.test import TestCase
from django.core.management import call_command
from discordauth.models import User


class SeedUsersTestCase(TestCase):
    def setUp(self):
        self.out = StringIO()
    
    def bulk_create_users(self, num):
        users = [
            User(
                id=i,
                username=f'User {i}',
                email=f'user{i}@email',
                avatar='avatar_hash',
                discriminator='0000'
            ) for i in range(num+1)
        ]; User.objects.bulk_create(users)
        
    def test_command_working_on_empty_db(self):
        call_command("seed_users", stdout=self.out)
        self.assertEqual(User.objects.count(), 30)
    
    def test_command_working_on_db_with_users(self):
        self.bulk_create_users(10)
        call_command("seed_users", stdout=self.out)
        self.assertEqual(User.objects.count(), 30)

    def test_command_not_deleting_admin_users(self):
        User.objects.create(
            id=1,
            username=f'User 1',
            email=f'user1@email',
            avatar='avatar_hash',
            discriminator='0000',
            is_staff=True,
            is_superuser=True
        )
        call_command("seed_users", stdout=self.out)
        
        super_users = User.objects.filter(is_superuser=True)
        self.assertEqual(User.objects.count(), 31)
        self.assertEqual(super_users.count(), 1)

