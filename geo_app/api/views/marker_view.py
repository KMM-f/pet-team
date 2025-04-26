from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from ..models import Marker
from ..serializers import MarkerSerializer

class MarkerDetail(RetrieveUpdateDestroyAPIView):

    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer
    lookup_field = "pk"


class CreateMarker(CreateAPIView):

    queryset = Marker.objects.all()
    serializer_class = MarkerSerializer