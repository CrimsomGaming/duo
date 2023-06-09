from django.db import models
from django.db.models import F, Q, Count, When, Case
from django.db.models.functions import Cast


class AnnouncementAnnotateMixin(models.Manager):
    def _annotate_match_ordering_fields(self, anns, user_ann):
        start_period, end_period = (
            user_ann.play_period_end,
            user_ann.play_period_start, 
        )
        return anns.annotate(
            play_period_match_ord=Case(When(
                Q(play_period_start__in=(start_period, end_period)) &
                Q(play_period_end__in=(start_period, end_period)), then=0),
                default=1,
                output_field=models.IntegerField()
            ),
            play_since_match_ord=Case(
                When(play_since=user_ann.play_since, then=0),
                default=1,
                output_field=models.IntegerField()
            ),
        )

    def _annotate_default_ordering_fields(self, game):
        return self.annotate(
            total_hours_a_day=Cast(
                F('play_period_end') - F('play_period_start'),
                output_field=models.IntegerField()
            ),
            weekdays_count=Count(F('play_weekdays')),
            hours_count=F('total_hours_a_day') * F('weekdays_count'),
        ).filter(game=game)


class AnnouncementManager(AnnouncementAnnotateMixin):
    def __get_ordering_params(self, user_has_ann):
        params = ['-weekdays_count', '-total_hours_a_day', '-voice_chat']
        if user_has_ann:
            return ['play_period_match_ord', 'play_since_match_ord', *params]
        return params
    
    def _get_user_announcement(self, game, user):
        try:
            return self.get(game=game, user=user), True
        except:
            return None, False

    def get_ordered_announcements(self, game, user): 
        anns = self._annotate_default_ordering_fields(game)
        user_ann, user_has_ann = self._get_user_announcement(game, user)

        if user_has_ann:
            args = (anns, user_ann)
            anns = self._annotate_match_ordering_fields(*args)
            anns = anns.exclude(user=user)
            
        ordering_params = self.__get_ordering_params(user_ann)
        return anns.order_by(*ordering_params)

