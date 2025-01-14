from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.global_extrainfo_list ,name='global_extrainfo_list'),
    path('get-user-roles-by-email/', views.get_user_role_by_email ,name='get_user_role_by_email'),
    path('update-user-roles/', views.update_user_roles ,name='update_user_roles'),
    path('view-roles/', views.global_designation_list ,name='global_designation_list'),
    path('create-role/', views.add_designation ,name='add_designation'),
    path('delete-role/', views.delete_designation ,name='delete_designation'),
    path('modify-role/', views.update_designation ,name='update_designation'),
    path('get-module-access/', views.get_module_access, name='get_module_access'),
    path('modify-roleaccess/', views.modify_moduleaccess ,name='modify_moduleaccess'),
    path('users/add-student', views.add_individual_student, name='add_individual_student'),
    path('users/add/', views.add_user, name='add-user'),
    path('users/<int:pk>/', views.user_detail, name='user-detail'),
    path('users/<int:pk>/update/', views.update_user, name='update-user'),
    path('users/<int:pk>/delete/', views.delete_user, name='delete-user'),
    path('users/reset_password/', views.reset_password, name='reset-password'),
    path('users/import/', views.bulk_import_users, name='bulk-import-users'),
    path('users/export/', views.bulk_export_users, name='bulk-export-users'),
    path('users/mail-batch/', views.mail_to_whole_batch, name='mail-to-whole-batch'),
    path('login/', views.login_view, name='login')
]
