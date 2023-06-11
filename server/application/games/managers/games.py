from django.db import models
from django.db.models import F, Case, When, Count, Exists, OuterRef


class GameManager(models.Manager):
    def _user_ann(self, user):
        user_has_ann = Exists(
            user.announcements.filter(game_id=OuterRef('id'))
        )
        return Case(
            When(user_has_ann, then=1), 
                default=0, 
                output_field=models.IntegerField()
        )
    
    def ann_count(self, user):
        ann_count = Count(F('announcements'))
        if user.is_authenticated:
            return {'ann_count': ann_count - self._user_ann(user)}
        return {'ann_count': ann_count}

    def all_with_ann_count(self, user):
        return self.annotate(**self.ann_count(user))

