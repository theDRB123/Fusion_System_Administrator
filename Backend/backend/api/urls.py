from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.global_extrainfo_list ,name='global_extrainfo_list'),
    path('create-role/', views.add_designation ,name='add_designation'),
    path('delete-role/', views.delete_designation ,name='delete_designation'),
    path('modify-role/', views.update_designation ,name='update_designation'),
]
