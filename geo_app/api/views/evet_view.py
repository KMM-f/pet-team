from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from ..models import Event
from ..serializers import EventSerializer

class EventDetail(RetrieveUpdateDestroyAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "pk"


class CreateEvent(CreateAPIView):

    queryset = Event.objects.all()
    serializer_class = EventSerializer