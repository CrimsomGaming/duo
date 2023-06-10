from .rules import AnnouncementMatchOrderingRules


class AnnouncementScoreManagerMixin(AnnouncementMatchOrderingRules):
    def _annotate_match_ordering_fields(self, anns, user_ann):
        annotations = self._get_annotations(user_ann)
        return anns.annotate(**annotations)

    def _annotate_default_ordering_fields(self, game):
        default_annotations = self._get_default_ordering_annotations()
        return self.annotate(**default_annotations).filter(game=game)
        
    def _get_ordering_params(self, user_has_ann):
        params = ['-total_score', '-voice_chat']
        if user_has_ann:
            return ['-total_score', '-voice_chat']
        return params
 
