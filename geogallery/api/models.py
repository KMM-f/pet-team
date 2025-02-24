from django.db import models
from django.contrib.auth.models import User
from django.db.models import ForeignKey


class Room(models.Model):

    """
    Моделька комнаты, создаются два поля связи с таблицей User
    attendees - User-ы участники
    owner - владелец комнаты
    """

    name = models.CharField(max_length=100)

    attendees = models.ForeignKey(User, on_delete=models.CASCADE, related_name="room_attendees")
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="room_owner")


class Marker(models.Model):

    """
    Создаётся связь с таблицей Room и связь с таблицей User
    """

    title = models.CharField(max_length=500)
    latitude = models.DecimalField(max_digits=19, decimal_places=10)
    longitude = models.DecimalField(max_digits=19, decimal_places=10)
    data = models.DateField()

    room = ForeignKey(Room, on_delete=models.CASCADE, related_name="room")
    author_marker = ForeignKey(User, on_delete=models.CASCADE, related_name="author_marker")


class RoomPhoto(models.Model):

    """
    моделька, хранящая фотографии комнаты
    """

    link = models.URLField()

    room = ForeignKey(Room, on_delete=models.CASCADE)