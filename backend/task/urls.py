from django.urls import path, include

from task.views import TaskList, TaskDetail, TaskCreate


urlpatterns = [
    path("tasks/", TaskList.as_view(), name="task_list"),
    path("task/c", TaskCreate.as_view(), name="task_create"),
    path("task/<int:pk>/", TaskDetail.as_view(), name="task_detail"),
    path("auth/", include("rest_framework.urls")),
]
