from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):

    title = models.CharField(max_length=500)
    date = models.DateField()

    room = models.ForeignKey("Room", related_name="room", on_delete=models.CASCADE)
    author_event = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author_event")



class Marker(models.Model):

    """
    Создаётся связь с таблицей Room и связь с таблицей User
    """

    latitude = models.DecimalField(max_digits=19, decimal_places=10)
    longitude = models.DecimalField(max_digits=19, decimal_places=10)

    author_marker = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author_marker")
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="event", null=True, blank=True)


class Room(models.Model):

    """
    Моделька комнаты, создаются два поля связи с таблицей User
    attendees - User-ы участники
    owner - владелец комнаты
    """

    name = models.CharField(max_length=100)

    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="room_owner")
    attendees = models.ManyToManyField(User, related_name="room_attendees", blank=True, null=True)
    markers = models.ManyToManyField(Marker, related_name="markers", null=True, blank=True)