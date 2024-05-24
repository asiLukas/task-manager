from rest_framework import serializers

from task.models import Task


class TaskSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source="owner.username")

    class Meta:
        model = Task
        fields = [
            "id",
            "owner",
            "title",
            "description",
            "priority",
            "created",
            "updated",
        ]
