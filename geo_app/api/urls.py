from django.urls import path

from .views import *

urlpatterns = [
    path("rooms/", RoomList.as_view()),
    path("room/<int:pk>/", RoomDetail.as_view()),
    path("room/", CreateRoom.as_view()),

    path("marker/", CreateMarker.as_view()),
    path("marker/<int:pk>/", MarkerDetail.as_view()),

    path("event/", CreateEvent.as_view()),
    path("event/<int:pk>/", EventDetail.as_view()),

    path("user/", CreateUser.as_view()),
    path("user/<int:pk>/", UserDetail.as_view())
]