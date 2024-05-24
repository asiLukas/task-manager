from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)

from task.models import Task
from task.serializers import TaskSerializer
from task.utils import CustomPagination, IsOwnerReadOnly


# GET
class TaskList(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)


# PUT, DELETE, GET
class TaskDetail(RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = "pk"

    permission_classes = [permissions.IsAuthenticated, IsOwnerReadOnly]

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)


# POST
class TaskCreate(CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    permission_classes = [permissions.IsAuthenticated, IsOwnerReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def get_queryset(self):
        return Task.objects.filter(owner=self.request.user)
