import csv
import datetime
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.parsers import FileUploadParser
from .models import GlobalsExtrainfo, GlobalsDesignation, GlobalsHoldsdesignation, GlobalsModuleaccess, AuthUser, Batch, Student
from .serializers import GlobalExtraInfoSerializer, GlobalsDesignationSerializer, GlobalsModuleaccessSerializer, AuthUserSerializer, GlobalsHoldsDesignationSerializer, StudentSerializer
from io import StringIO
from .helpers import create_password, send_email, mail_to_user, check_csv, convert_to_iso, format_phone_no, get_department, configure_password_mail

# get list of all users
@api_view(['GET'])
def global_extrainfo_list(request):
    records = GlobalsExtrainfo.objects.all()
    serializer = GlobalExtraInfoSerializer(records, many=True)
    return Response(serializer.data)

# get user by email and then fetch the role details 
@api_view(['GET'])
def get_user_role_by_email(request):
    email = request.query_params.get('email')
    
    if not email:
        return Response({"error": "Email parameter is required"}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        user = AuthUser.objects.get(email=email)
        # user_id = user.id
        holds_designation_entries = GlobalsHoldsdesignation.objects.filter(user=user)
        # user_id = user.id
        holds_designation_entries = GlobalsHoldsdesignation.objects.filter(user=user)
        print(holds_designation_entries)
        
        designation_ids = [entry.designation.id for entry in holds_designation_entries]
        
        roles = GlobalsDesignation.objects.filter(id__in=designation_ids)
        roles_serializer = GlobalsDesignationSerializer(roles, many=True)
        
        return Response({
            "user": AuthUserSerializer(user).data,
            "roles": roles_serializer.data,
        }, status=status.HTTP_200_OK)
        
    except AuthUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# update user's roles
@api_view(['PUT'])
def update_user_roles(request):
    email = request.data.get('email')
    roles_to_add = request.data.get('roles')

    if not email or not roles_to_add:
        return Response({"error": "Email and roles are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(AuthUser, email=email)

    # Get existing roles' names as a set of strings
    existing_roles = GlobalsHoldsdesignation.objects.filter(user=user)
    existing_role_names = set(existing_roles.values_list('designation__name', flat=True))

    # Normalize roles_to_add: Extract names from dicts and keep strings
    processed_roles_to_add = set()

    for role in roles_to_add:
        if isinstance(role, dict):
            # Check if 'name' key exists in the dictionary
            if 'name' in role:
                processed_roles_to_add.add(role['name'])  # Extract name from dict
        elif isinstance(role, str):
            processed_roles_to_add.add(role)  # Keep string as is

    print("Processed roles_to_add:", processed_roles_to_add)  # Log processed roles_to_add

    # Find roles to remove
    roles_to_remove = existing_role_names - processed_roles_to_add

    # Remove roles that are not in the new list
    GlobalsHoldsdesignation.objects.filter(user=user, designation__name__in=roles_to_remove).delete()

    # Add new roles
    for role_name in processed_roles_to_add:
        if role_name not in existing_role_names:
            designation = get_object_or_404(GlobalsDesignation, name=role_name)
            GlobalsHoldsdesignation.objects.create(
                held_at=timezone.now(),
                designation=designation,
                user=user,
                working=user
            )

    return Response({"message": "User roles updated successfully."}, status=status.HTTP_200_OK)
        
# get list of all roles
@api_view(['GET'])
def global_designation_list(request):
    records = GlobalsDesignation.objects.all()
    serializer = GlobalsDesignationSerializer(records, many=True)
    return Response(serializer.data) 

# add a new role
@api_view(['POST'])
def add_designation(request):
    serializer = GlobalsDesignationSerializer(data=request.data)
    if serializer.is_valid():
        role = serializer.save()
        data = {
            'designation' : role.name,
            'program_and_curriculum' : False,
            'course_registration' : False,
            'course_management' : False,
            'other_academics' : False,
            'spacs' : False,
            'department' : False,
            'examinations' : False,
            'hr' : False,
            'iwd' : False,
            'complaint_management' : False,
            'fts' : False,
            'purchase_and_store' : False,
            'rspc' : False,
            'hostel_management' : False,
            'mess_management' : False,
            'gymkhana' : False,
            'placement_cell' : False,
            'visitor_hostel' : False,
            'phc' : False,
        }
        module_serializer = GlobalsModuleaccessSerializer(data=data)
        if module_serializer.is_valid():
            module_serializer.save()
        return Response({'role': serializer.data, 'modules': module_serializer.data}, status.HTTP_201_CREATED)
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

def add_extra_ino_to_user(request,user):
    extra_info_data = {
        'title': request.data.get('title'),
        'sex': request.data.get('sex'),
        'date_of_birth': request.data.get('date_of_birth'),
        'user_status': request.data.get('user_status'),
        'address': request.data.get('address'),
        'phone_no': request.data.get('phone_no'),
        'user_type': request.data.get('user_type'),
        'profile_picture': request.data.get('profile_picture', None),
        'about_me': request.data.get('about_me'),
        'date_modified': datetime.datetime.now().isoformat(),
        'department': request.data.get('department'),
        'user': user
    }
    extra_info_serializer = GlobalExtraInfoSerializer(data=extra_info_data)
    if extra_info_serializer.is_valid():
        extra_info_serializer.save()
        return Response(extra_info_serializer.data, status=status.HTTP_201_CREATED)
    return Response(extra_info_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_user(request):
    password = create_password(request.data)
    student_role = GlobalsDesignation.objects.get(name='Student')
    student_role_id = student_role.id
    data = {
        'password': password,
        'password': password,
        'is_superuser': request.data.get('is_superuser') or False,
        'username': request.data.get('rollNo').upper(),
        'first_name': request.data.get('name').split(' ')[0].capitalize(),
        'last_name': ' '.join(request.data.get('name').split(' ')[1:]).capitalize() if len(request.data.get('name').split(' ')) > 1 else '-',
        'email': f"{request.data.get('rollNo').lower()}@iiitdmj.ac.in",
        'is_staff': request.data.get('role')!=student_role_id,
        'is_active': True,
        'date_joined': datetime.datetime.now().isoformat(),
    }
    serializer = AuthUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        created_users = []
        created_users.append(serializer.data)
        role_data = {
            'held_at': datetime.datetime.now().isoformat(),
            'designation': request.data.get('role'),
            'user': serializer.data.get('id'),
            'working': serializer.data.get('id')
        }
        role_serializer = GlobalsHoldsDesignationSerializer(data=role_data)
        if role_serializer.is_valid():
            role_serializer.save()
        mail_to_user(created_users)
        return Response({'created_users':created_users}, status=status.HTTP_201_CREATED)
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
    
@api_view(['POST'])
def reset_password(request):
    roll_no = request.data.get('rollNo')
    try:
        user = AuthUser.objects.get(username=roll_no.upper())
        new_password = create_password(request.data)
        while new_password == user.password:
            new_password = create_password(request.data)
        
        user.password = new_password
        user.save()
        
        subject = 'Your Password has been reset!!'
        message = f"This Mail is to notify you that your password has been reset by the System Administrator.\n\nPlease check out the new password below:  {new_password}\n\nRegards,\nSystem Administrator,\nIIITDM Jabalpur."
        recipient_list = ['agarwalsamaksh11@gmail.com']
        # recipient_list = [f"{user.email}"]
        send_email(subject=subject, message=message, recipient_list=recipient_list)
        
        return Response({"password": new_password,"message": "Password reset successfully."}, status=status.HTTP_200_OK)
    except AuthUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# get module access for a specific role 
@api_view(['GET'])
def get_module_access(request):
    role_name = request.query_params.get('designation')
    
    if not role_name:
        return Response({"error": "No role provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        module_access = GlobalsModuleaccess.objects.get(designation=role_name)
    except GlobalsModuleaccess.DoesNotExist:
        return Response({"error": f"Module access for designation '{role_name}' not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = GlobalsModuleaccessSerializer(module_access)
    return Response(serializer.data, status=status.HTTP_200_OK)
    
# modify role access
@api_view(['PUT'])
def modify_moduleaccess(request):
    role_name = request.data.get('designation')
    
    if not role_name:
        return Response({"error": "No role provided."}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        designation = GlobalsModuleaccess.objects.get(designation=role_name)
    except GlobalsModuleaccess.DoesNotExist:
        return Response({"error": f"Designation with name '{role_name}' not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = GlobalsModuleaccessSerializer(designation, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def add_user_extra_info(row,user):
    print("row",row)
    print("user",user)
    extra_info_data = {
        'id': row[0].upper(),
        'title': 'Mr.' if row[4][0].upper() == 'M' else 'Ms.',
        'sex': row[4][0].upper(),
        'date_of_birth': convert_to_iso(row[5]),
        'user_status': "PRESENT",
        'address': row[10].lower().capitalize() if row[10] else 'NA',
        'phone_no': format_phone_no(row[9]),
        'user_type': 'student',
        'profile_picture': None,
        'about_me': 'NA',
        'date_modified': datetime.datetime.now().strftime("%Y-%m-%d"),
        'department': get_department(row[0].upper()).id,
        'user': user.id,
    }
    print("extra_info_data",extra_info_data)
    extra_info_serializer = GlobalExtraInfoSerializer(data=extra_info_data)
    if extra_info_serializer.is_valid():
        return extra_info_serializer
    print("eror in extrainfo",extra_info_serializer.errors)
    return None

def add_user_designation_info(user_id, designation='student'):
    designation_id = GlobalsDesignation.objects.get(name=designation).id
    data = {
        'designation' : designation_id,
        'user' : user_id,
        'working' : user_id,
    }
    print("data",data)
    serializer = GlobalsHoldsDesignationSerializer(data=data)
    if serializer.is_valid():
        return serializer
    print("error in role",serializer.errors)
    return None

def add_student_info(row, extrainfo):
    programme = 'B.Des' if row[0][3].upper()=='D' else 'B.Tech'
    batch = int(2000+int(''.join(row[0][:2])))
    disp = get_department(row[0].upper()).name
    anc = disp
    if disp == 'Design':
        anc = 'Des.'
    batch_id = Batch.objects.all().filter(name = programme, discipline__acronym = anc, year = batch).first()
    print("Before", programme, anc, batch, batch_id)
    data = {
        'id' : extrainfo.id,
        'programme' : 'B.Des' if row[0][3].upper()=='D' else 'B.Tech',
        'batch' : batch,
        'batch_id' : batch_id.id,
        'cpi': 0.0,
        'category' : 'GEN' if row[8][0].upper() == 'G' else 'OBC' if row[8][0].upper() == 'O' else 'SC' if row[8][1].upper() == 'C' else 'ST',
        'father_name' : row[6].lower().capitalize(),
        'mother_name' : row[7].lower().capitalize(),
        'hall_no': row[13] if row[13] else 0,
        'room_no': 0,
        'specialization': None,
        'curr_semester_no' : 2*(datetime.datetime.now().year - batch) + datetime.datetime.now().month // 7,
    }
    print("add_student_info",data)
    serializer = StudentSerializer(data=data)
    if serializer.is_valid():
        return serializer
    print("error in student",serializer.errors)
    return None


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
    failed_users = []
    
    for row in csv_data:
        if len(row) < 4:
            failed_users.append(row)
            continue
        # try:
        data = {
            'rollNo': row[0],
            'name': row[1],
        }
        user_data = {
            'password': create_password(data),
            'username': row[0].upper(),
            'first_name': row[1].split(' ')[0].lower().capitalize(),
            'last_name': ' '.join(row[1].split(' ')[1:]).capitalize() if len(row[1].split(' ')) > 1 else 'NA',
            'email': f"{row[0].lower()}@iiitdmj.ac.in",
            'is_staff': False,
            'is_superuser': False,
            'is_active': True,
            'date_joined': datetime.datetime.now().strftime("%Y-%m-%d"),
        }
        serializer = AuthUserSerializer(data=user_data)
        user = None
        if serializer.is_valid():
            user = serializer.save()
        print("Error in user",serializer.errors)
        extra_info_serializer = add_user_extra_info(row, user)
        extra_serializer = None
        if extra_info_serializer:
            extra_serializer = extra_info_serializer.save()
        role_serializer = add_user_designation_info(user.id)
        if role_serializer:
            role_serializer.save()
        student_serializer = add_student_info(row, extra_serializer)
        if student_serializer:
            student_serializer.save()
        if user and extra_info_serializer and role_serializer and student_serializer:
            created_users.append(serializer.data)
        # except Exception as e:
            # print("error",e)
            # failed_users.append(row)
        
    response_data = {
        "message": f"{len(created_users)} users created successfully.",
        "created_users": created_users,
        "skipped_users_count": len(failed_users),
    }

    if failed_users:
        output = StringIO()
        writer = csv.writer(output)
        writer.writerow(headers)

        for failed_user in failed_users:
            writer.writerow(failed_user)

        output.seek(0)
        response_data["skipped_users_csv"] = output.getvalue()

    if len(created_users): 
        mail_to_user(created_users)
    
    return Response(response_data, status=status.HTTP_201_CREATED)

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

@api_view(['POST'])
def mail_to_whole_batch(request):
    print("request.data",request.data)
    students = Student.objects.filter(batch=request.data.get('batch'))
    students_data = [student.id.user for student in students]
    try:
        configure_password_mail(students_data)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response({"message": "Mail sent to whole batch successfully."}, status=status.HTTP_200_OK)