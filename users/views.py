from rest_framework import generics

from users.models import CustomUserModel
from . import serializers


class UserListView(generics.ListCreateAPIView):
    queryset = CustomUserModel.objects.all()
    serializer_class = serializers.UserSerializer
