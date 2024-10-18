import csv
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import FileUploadParser
from .models import GlobalsExtrainfo, GlobalsDesignation, GlobalsModuleaccess, AuthUser, AuthPermission
from .serializers import GlobalExtraInfoSerializer, GlobalsDesignationSerializer, GlobalsModuleaccessSerializer, AuthUserSerializer, AuthPermissionSerializer
from io import StringIO

# get list of all users
@api_view(['GET'])
def global_extrainfo_list(request):
    records = GlobalsExtrainfo.objects.all()
    serializer = GlobalExtraInfoSerializer(records, many=True)
    return Response(serializer.data)

# get list of all roles
@api_view(['GET'])
def global_designation_list(request):
    records = GlobalsDesignation.objects.all()
    serializer = GlobalsDesignationSerializer(records, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def privileges_list(request):
    content_type_number = request.data.get('content-type')
    
    if not content_type_number:
        return Response({"error": "No content-type number provided."}, status=status.HTTP_400_BAD_REQUEST)

    privileges = AuthPermission.objects.filter(content_type = content_type_number)
    
    if privileges.exists():
        serializer = AuthPermissionSerializer(privileges, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    else :
        return Response({"message": "No privileges found."}, status=status.HTTP_404_NOT_FOUND)
        

# add a new role
@api_view(['POST'])
def add_designation(request):
    serializer = GlobalsDesignationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_201_CREATED)
    else :
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)
    
# delete a role
@api_view(['DELETE'])
def delete_designation(request):
    name = request.data.get('name')
    
    if not name:
        return Response({"error": "No name provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        designation = GlobalsDesignation.objects.get(name=name)
        designation.delete()
        return Response({"message": f"Designation '{name}' deleted successfully."}, status=status.HTTP_200_OK)
    except GlobalsDesignation.DoesNotExist:
        return Response({"error": f"Designation with name '{name}' not found."}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
# modify a role
@api_view(['PUT', 'PATCH'])
def update_designation(request):
    name = request.data.get('name')
    
    if not name:
        return Response({"error": "No name provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        designation = GlobalsDesignation.objects.get(name=name)
    except GlobalsDesignation.DoesNotExist:
        return Response({"error": f"Designation with name '{name}' not found."}, status=status.HTTP_404_NOT_FOUND)
    
    partial = request.method == 'PATCH'
    serializer = GlobalsDesignationSerializer(designation, data=request.data, partial=partial)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_user(request):
    serializer = AuthUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def user_detail(request, pk):
    try:
        user = AuthUser.objects.get(pk=pk)
    except AuthUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = AuthUserSerializer(user)
    return Response(serializer.data)

@api_view(['PUT', 'PATCH'])
def update_user(request, pk):
    try:
        user = AuthUser.objects.get(pk=pk)
    except AuthUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    partial = request.method == 'PATCH'
    serializer = AuthUserSerializer(user, data=request.data, partial=partial)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_user(request, pk):
    try:
        user = AuthUser.objects.get(pk=pk)
        user.delete()
        return Response({"message": "User deleted successfully"}, status=status.HTTP_200_OK)
    except AuthUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# modify role access
@api_view(['PUT'])
def modify_moduleaccess(request):
    role_name = request.data.get('designation')
    
    if not role_name:
        return Response({"error": "No role provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        designation = GlobalsModuleaccess.objects.get(designation=role_name)
    except GlobalsModuleaccess.DoesNotExist:
        return Response({"error": f"Designation with name '{designation}' not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = GlobalsModuleaccessSerializer(designation, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


#bulk import of users via csv file
@api_view(['POST'])
def bulk_import_users(request):
    if 'file' not in request.FILES:
        return Response({"error": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    file = request.FILES['file']
    if not file.name.endswith('.csv'):
        return Response({"error": "Please upload a valid CSV file."}, status=status.HTTP_400_BAD_REQUEST)

    file_data = file.read().decode('utf-8')
    csv_data = csv.reader(StringIO(file_data))
    
    headers = next(csv_data)  
    created_users = []
    for row in csv_data:
        try:
            #CSV columns: username, first_name, last_name, email, password, is_staff, is_superuser
            user_data = {
                'username': row[0],
                'first_name': row[1],
                'last_name': row[2],
                'email': row[3],
                'password': row[4],  # You might need to hash the password.
                'is_staff': row[5].lower() == 'true',
                'is_superuser': row[6].lower() == 'true',
                'is_active': True,  # Default active status
            }
            serializer = AuthUserSerializer(data=user_data)
            if serializer.is_valid():
                user = serializer.save()
                user.set_password(user_data['password'])  # Hash the password
                user.save()
                created_users.append(serializer.data)
            else:
                return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        except IndexError:
            return Response({"error": "Invalid data format."}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": f"{len(created_users)} users created successfully.", "users": created_users}, status=status.HTTP_201_CREATED)

#bulk export of users via csv file
@api_view(['GET'])
def bulk_export_users(request):
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="users_export.csv"'

    writer = csv.writer(response)
    writer.writerow(['username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser'])
    users = AuthUser.objects.all()
    
    for user in users:
        writer.writerow([user.username, user.first_name, user.last_name, user.email, user.is_staff, user.is_superuser])
    
    return response