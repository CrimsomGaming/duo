from django.contrib.auth.models import AnonymousUser
from datetime import time
from games.models import Announcement, Game, User, Weekday
from django.test import TestCase


class AbstractAnnouncementTestCase(TestCase):
    def setUp(self) -> None:
        self.game = Game.objects.create(name='Test Game')
        self.weekday = Weekday.objects.create(name='MON')
        self.user = User.objects.create_user({
            'id': 999999,
            'username': 'someusername',
            'email': 'hello@world.com',
            'global_name': None,
            'avatar': 'atavar',
            'discriminator': '0000'
        })
        self.ann_data = {
            'user': self.user,
            'game_id': self.game.pk,
            'nickname': 'tester',
            'play_period_start': time(hour=7),
            'play_period_end': time(hour=10),
            'play_since': 1,
        }


class AnnouncementManagerTestCase(AbstractAnnouncementTestCase):
    def test_create_or_update_is_creating(self):
        self.assertEqual(Announcement.objects.count(), 0)
        Announcement.objects.create_or_update(**self.ann_data)
        self.assertEqual(Announcement.objects.count(), 1)

    def test_create_or_update_is_updating(self):
        ann = Announcement.objects.create_or_update(**self.ann_data)
        self.assertEqual(Announcement.objects.count(), 1)
        self.assertEqual(ann.play_since, 1)
        
        ann_edit_data = self.ann_data
        ann_edit_data['play_since'] = 42
        ann_edit = Announcement.objects.create_or_update(**ann_edit_data)

        self.assertEqual(Announcement.objects.count(), 1)
        self.assertEqual(ann_edit.play_since, 42)
        self.assertEqual(self.user.announcements.count(), 1)
    

class OrderingTestCase(AbstractAnnouncementTestCase):
    def setUp(self) -> None:
        super().setUp()
        self.manager = Announcement.objects
    
    def create_user_ann(self, **kwargs):
        user = User.objects.create(
            id=kwargs.get('id'),
            username=kwargs.get('username', 'test-generic'),
            email='hello@world.com',
            global_name=None,
            avatar='atavar',
            discriminator='0000'
        )
        ann = Announcement.objects.create(
            game=self.game,
            user=user,
            nickname='nick',
            play_period_start=time(kwargs.get('start', 0)),
            play_period_end=time(kwargs.get('end', 1)),
            play_since=kwargs.get('since', 1),
            voice_chat=kwargs.get('voice_chat', False)
        ) 
        return ann, user

    def test_order_by_score(self):
        """
        If the request user is not authenticated or does not have an 
        announcement in certain game. total_score should be the sum of
        weekdays_count and total_hours - wich is weekdays_count * total_
        hours_a_day
        """
        ex_ann, _ = self.create_user_ann(id=1)
        ex_ann.play_weekdays.add(Weekday.objects.get(id=1))
        
        data = {'weekdays_count': 1, 'hours_count': 1, 'total_score': 2}
        ann = self.manager.order_by_score(self.game, AnonymousUser)\
            .values(*data.keys())[0]
        
        self.assertDictEqual(ann, data)

        
    def test_order_by_score_matching(self):
        """
        tests if the request user is authenticated and has a announcement
        in the provided game.
        """
        ex_ann, _ = self.create_user_ann(id=1, play_since=2)
        ex_ann.play_weekdays.add(Weekday.objects.get(id=1))

        test_ann, user = self.create_user_ann(id=2, play_since=2)
        test_ann.play_weekdays.add(Weekday.objects.get(id=1))

        data = {
            'default_score': 2,
            'match_score': 100,
            'play_period_score': 7,
            'play_since_score': 7,
            'play_weekdays_score': 3,
            'voice_chat_score': 3,
            'total_score': 102
        }
        ann = self.manager.order_by_score(self.game, user)\
        .values(*data.keys())[0]

        self.assertDictEqual(ann, data)

    def test_order_by_score_with_some_matching(self):
        ex_ann, _ = self.create_user_ann(id=1, since=3, start=2, end=23)
        ex_ann.play_weekdays.add(Weekday.objects.create(name='TUE'))

        test_ann, user = self.create_user_ann(id=2, since=2)
        test_ann.play_weekdays.add(Weekday.objects.get(id=1))
        data = {
            'default_score': 22,
            'match_score': 25,
            'play_period_score': 1,
            'play_since_score': 1,
            'play_weekdays_score': 0,
            'voice_chat_score': 3,
            'total_score': 47
        }
        ann = self.manager.order_by_score(self.game, user)\
        .values(*data.keys())[0]
        self.assertDictEqual(ann, data)

