from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient

from task.models import Task


class TaskModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.task = Task.objects.create(
            owner=self.user,
            title="Test Task",
            description="This is a test task",
            priority=Task.NORMAL_PRIORITY,
        )

    def test_task_creation(self):
        self.assertEqual(self.task.owner.username, "testuser")
        self.assertEqual(self.task.title, "Test Task")
        self.assertEqual(self.task.description, "This is a test task")
        self.assertEqual(self.task.priority, Task.NORMAL_PRIORITY)


class TaskCreateAPITest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client.login(username="testuser", password="testpass")

    def test_task_create(self):
        data = {
            "title": "New Task",
            "description": "New Task Description",
            "priority": "medium",
        }
        response = self.client.post("/api/task/c", data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(Task.objects.count(), 1)
        task = Task.objects.first()
        self.assertEqual(task.title, "New Task")
        self.assertEqual(task.description, "New Task Description")
