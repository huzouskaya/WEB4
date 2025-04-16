from django.urls import path
from . import views

from rest_framework import routers
from .views import UserViewSet

router = routers.DefaultRouter()

router.register('users', UserViewSet)

urlpatterns = router.urls + [
    path('api/set-csrf-token', views.set_csrf_token, name='set_csrf_token'),
    path('api/login', views.login_view, name='login'),
    path('api/logout', views.logout_view, name='logout'),
    path('api/user', views.user, name='user'),
    path('api/register', views.register, name='register'),
    path('api/score', views.score, name='score'),
    path('api/get-score/', views.get_score, name='get_score'),
]