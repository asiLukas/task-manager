from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)

from task.models import Task
from task.serializers import TaskSerializer


# GET
class TaskList(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


# PUT, DELETE, GET
class TaskDetail(RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    lookup_field = "pk"


# POST
class TaskCreate(CreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
