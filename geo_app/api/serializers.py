from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from .models import *

user_queryset = User.objects.all()


class UserSerializer(ModelSerializer):

    queryset = user_queryset

    class Meta:
        model = User
        fields = ["id", "username", "email"]


class EventSerializer(ModelSerializer):

    queryset = Event.objects.all()

    class Meta:
        model = Event
        fields = "__all__"







rooms_queryset = Room.objects.all()

class MarkerSerializer(ModelSerializer):

    author_marker = UserSerializer
    event = EventSerializer

    class Meta:
        model = Marker
        fields = "__all__"


class RoomSerializer(ModelSerializer):

    owner = PrimaryKeyRelatedField(queryset=user_queryset, many=False)

    attendees = PrimaryKeyRelatedField(many=True, queryset=user_queryset)
    markers = MarkerSerializer(many=True, required=False)

    class Meta:
        model = Room
        fields = "__all__"



