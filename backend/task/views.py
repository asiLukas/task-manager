from django.shortcuts import render
from rest_framework import permissions
from rest_framework.generics import (
    CreateAPIView,
    RetrieveUpdateDestroyAPIView,
    ListAPIView,
)
from rest_framework.filters import OrderingFilter, SearchFilter

from task.models import Task
from task.serializers import TaskSerializer
from task.utils import CustomPagination, IsOwnerReadOnly


# GET
class TaskList(ListAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = CustomPagination
    filter_backends = [OrderingFilter, SearchFilter]
    ordering_fields = ["created", "updated", "title", "priority"]
    search_fields = ["title", "description"]

    def get_queryset(self):
        queryset = Task.objects.filter(owner=self.request.user)

        # get sorting field from the URL
        sort_by = self.request.query_params.get("sort_by")

        # make sure its a valid field
        if sort_by in self.ordering_fields:
            queryset = queryset.order_by(sort_by)

        return queryset


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
