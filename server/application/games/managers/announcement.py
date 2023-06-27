from datetime import time
from .ordering.mixins import AnnouncementScoreManagerMixin


class AnnouncementManager(AnnouncementScoreManagerMixin):
    def get_user_announcement(self, game, user):
        try: 
            ann = self.get(game=game, user=user)
            return (ann, True)
        except: return None, False

    def get_play_periods(self, pk):
        ann = self.get(pk=pk)
        return (ann.play_period_start, ann.play_period_end)
     
    def order_by_score(self, game, user): 
        anns = (
            self._annotate_default_ordering_fields(game)
            .select_related("game", "user")
            .prefetch_related("play_weekdays")
        )
        user_ann, user_has_ann = self.get_user_announcement(game, user)

        if user_has_ann:
            args = (anns, user_ann)
            anns = self._annotate_match_ordering_fields(*args)
            anns = anns.exclude(user=user)
            
        ordering_params = self._get_ordering_params(user_ann)
        return anns.order_by(*ordering_params)
    
    def create_or_update(self, **data):
        user, game_id = data['user'], data['game_id']

        if self.filter(user=user, game_id=game_id).exists():
            ann = self.get(user=user, game_id=game_id)
            start, end = self.get_play_periods(pk=ann.pk)
            ann.nickname = data.get('nickname', ann.nickname)
            ann.play_since = data.get('play_since', ann.play_since)
            ann.play_period_start = data.get('play_period_start', start)
            ann.play_period_end = data.get('play_period_end', end)
            ann.voice_chat = data.get('voice_chat', ann.voice_chat)
            ann.save() 
            return ann

        ann = self.create(**data)
        return ann

