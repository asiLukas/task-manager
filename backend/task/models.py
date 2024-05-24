from django.db import models


class Task(models.Model):
    owner = models.ForeignKey(
        "auth.User", on_delete=models.CASCADE, related_name="tasks"
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=256, blank=True, default="")
    description = models.TextField()

    LOW_PRIORITY = "low"
    NORMAL_PRIORITY = "medium"
    HIGH_PRIORITY = "high"

    PRIORITY_CHOICES = [
        (LOW_PRIORITY, "Low"),
        (NORMAL_PRIORITY, "Medium"),
        (HIGH_PRIORITY, "High"),
    ]
    priority = models.CharField(
        choices=PRIORITY_CHOICES, default=NORMAL_PRIORITY, max_length=10
    )

    class Meta:
        ordering = ["updated"]

    def __str__(self):
        return f"{self.id} -> {self.title}"
