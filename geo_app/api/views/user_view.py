from rest_framework.generics import CreateAPIView, RetrieveUpdateDestroyAPIView
from ..models import User
from ..serializers import UserSerializer

class UserDetail(RetrieveUpdateDestroyAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = "pk"


class CreateUser(CreateAPIView):

    queryset = User.objects.all()
    serializer_class = UserSerializer