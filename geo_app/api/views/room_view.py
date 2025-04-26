from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView

from ..models import Room
from ..serializers import RoomSerializer


class RoomList(ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomDetail(RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    lookup_field = "pk"


class CreateRoom(CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer