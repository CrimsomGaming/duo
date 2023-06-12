from django.db import models
from django.db.models import F, Q, Count, When, Case
from django.db.models.functions import ExtractHour


class AnnouncementDefaultOrderingRules(models.Manager):
    def _get_default_score(self):
        return F('weekdays_count')+F('hours_count')
        
    def _get_default_ordering_annotations(self):
        return {
            'total_hours_a_day': self._get_total_hours_a_day(),
            'weekdays_count': Count(F('play_weekdays')),
            'hours_count': F('weekdays_count') * F('total_hours_a_day'),
            'default_score': self._get_default_score(),
            'total_score': self._get_default_score()
        }

    def _get_total_hours_a_day(self):
        start, end = (
            ExtractHour(F('play_period_start')),
            ExtractHour(F('play_period_end'))
        )
        return end - start

class AnnouncementMatchOrderingRules(AnnouncementDefaultOrderingRules):
    def _get_play_simultaneously(self, user_ann):
        WEIGHT = 7
        start_period, end_period = self.get_play_periods(user_ann.pk)
        rule = (
            Q(play_period_start__in=(start_period, end_period)) | 
            Q(play_period_end__in=(start_period, end_period))
        )
        kwargs={'default': 1, 'output_field': models.IntegerField()}
        return Case(When(rule, then=1*WEIGHT), **kwargs)

    def _get_play_since_is_equal(self, user_ann):
        WEIGHT = 7
        rule = Q(play_since=user_ann.play_since)
        kwargs={'default': 1, 'output_field': models.IntegerField()}
        return Case(When(rule, then=1*WEIGHT), **kwargs)
        
    def _get_play_at_same_days(self, user_ann):
        WEIGTH = 3
        rule = Q(play_weekdays__in=user_ann.play_weekdays.all())
        return Count(F('play_weekdays'), filter=rule) * WEIGTH

    def _get_voice_chat_is_equal(self, user_ann):
        WEIGTH = 3
        rule = Q(voice_chat=user_ann.voice_chat)
        kwargs={'default': 1, 'output_field': models.IntegerField()}
        return Case(When(rule, then=1*WEIGTH), **kwargs)
    
    def _get_match_score(self, user_ann):
        return (
            F('play_since_score') +
            F('play_weekdays_score') +
            F('voice_chat_score') +
            F('play_period_score')
        )
        
    def _get_annotations(self, user_ann):
        return {
            'play_since_score': self._get_play_since_is_equal(user_ann),
            'play_weekdays_score': self._get_play_at_same_days(user_ann),
            'play_period_score': self._get_play_simultaneously(user_ann),
            'voice_chat_score': self._get_voice_chat_is_equal(user_ann),
            'match_score': self._get_match_score(user_ann) * 5,
            'default_score': self._get_default_score(),
            'total_score': F('match_score') + F('default_score')
        }

