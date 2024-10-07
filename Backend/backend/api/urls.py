from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.global_extrainfo_list ,name='global_extrainfo_list'),
]
