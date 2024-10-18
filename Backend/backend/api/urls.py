from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.global_extrainfo_list ,name='global_extrainfo_list'),
    path('view-privileges/', views.privileges_list, name='view_privileges'),
    path('add-new-privilege/', views.add_new_privilege, name='add_new_privilege'),
    path('view-roles/', views.global_designation_list ,name='global_designation_list'),
    path('create-role/', views.add_designation ,name='add_designation'),
    path('delete-role/', views.delete_designation ,name='delete_designation'),
    path('modify-role/', views.update_designation ,name='update_designation'),
    path('modify-roleaccess/', views.modify_moduleaccess ,name='modify_moduleaccess'),
    path('users/add/', views.add_user, name='add-user'),
    path('users/<int:pk>/', views.user_detail, name='user-detail'),
    path('users/<int:pk>/update/', views.update_user, name='update-user'),
    path('users/<int:pk>/delete/', views.delete_user, name='delete-user'),
     path('users/import/', views.bulk_import_users, name='bulk-import-users'),
    path('users/export/', views.bulk_export_users, name='bulk-export-users'),
]
