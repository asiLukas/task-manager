from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 15
    page_size_query_param = "page_size"
    max_page_size = 15


class IsOwnerReadOnly(permissions.BasePermission):
    """
    custom permission to make sure non-owners have only read-only
    rights even though we filter the querysets
    """

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user
