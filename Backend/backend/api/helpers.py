from rest_framework.response import Response
from rest_framework import status
import random
import string
import hashlib
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime
from .models import GlobalsDepartmentinfo, AuthUser, Student
import os

def create_password(data):
    first_name = data.get('name').split(' ')[0].lower().capitalize()
    roll_no_part = data.get('rollNo')[-3:].upper()
    special_characters = string.punctuation
    random_specials = ''.join(random.choice(special_characters) for _ in range(2))
    return f"{first_name}{roll_no_part}{random_specials}"


def create_password_from_authuser(student):
    special_characters = string.punctuation
    random_specials = "".join(random.choice(special_characters) for _ in range(2))
    roll_no = student.email[5:-14].upper()
    password = f"{student.first_name.lower().capitalize().split(' ')[0]}{roll_no}{random_specials}"
    print("password  ", password)
    hashed_password = make_password(password)
    return password, hashed_password


def save_password(student, hashed_password):
    student.password = hashed_password
    student.save()


def send_email(
    subject,
    message,
    from_email=settings.EMAIL_HOST_USER,
    recipient_list=[
        settings.EMAIL_TEST_USER,
    ],
):
    if not from_email:
        return Response(
            {"error": "No sender email provided."}, status=status.HTTP_400_BAD_REQUEST
        )
    try:
        send_mail(subject, message, from_email, recipient_list)
    except Exception as e:
        print(e)
        raise e

def configure_password_mail(students):
    print("configuring passwords and mailing")
    count = len(students)
    if int(settings.EMAIL_TEST_MODE) == 1 :
        print("hello", settings.EMAIL_TEST_COUNT)
        count = int(settings.EMAIL_TEST_COUNT)
    
    print(count)
    try:
        for student in students[:count]:
            plain_password, hashed_password = create_password_from_authuser(student)
            save_password(student, hashed_password)
            # save_password(student, make_password("user@123"))
            try:
                mail_to_user_single(student, plain_password)
            except Exception as e:
                log_failed_email(student, plain_password, hashed_password, str(e))
                
        return Response(
            {"message": "Email sent successfully."}, status=status.HTTP_200_OK
        )
    except Exception as e:
        print(e)
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

def log_failed_email(student, plain_password, hashed_password, error):
    log_dir = "failed_emails"
    os.makedirs(log_dir, exist_ok=True)
    log_file = os.path.join(log_dir, "failed_emails.txt")
    with open(log_file, "a") as f:
        f.write(f"Failed to send email to: {student.email}\n")
        f.write(f"Username: {student.username}\n")
        f.write(f"Plain Password: {plain_password}\n")
        f.write(f"Hashed Password: {hashed_password}\n")
        f.write(f"Error: {error}\n")
        f.write("\n")

def mail_to_user_single(student, password):
    user = {"username": student.username, "password": password, "email": student.email}
    subject = "Fusion Portal Credentials"
    
    message = (
        f"Dear Student,\n\n"
        "We are excited to introduce Fusion, our new ERP software, being developed by our own students, "
        "which is now live for the Pre-Registration Process. "
        "This platform will streamline your academic journey and provide a seamless experience for course registrations "
        "and other academic-related activities.\n\n"
        "Please find your login credentials below:\n\n"
        "Portal Link: \n http://fusion.iiitdmj.ac.in:8000 \n http://fusion.iiitdmj.ac.in/ \n http://172.27.16.216:8000/  (On LAN Only) /\n"
        f"Username: {user['username'].upper()}\n"
        f"Password: {password}\n\n"
        "Important Instructions:\n"
        "1. Initial Login: Use the credentials provided above to log in to the portal.\n"
        "2. Change Password: Upon first login, change your password with the following steps:\n"
        "   - Log Out\n"
        "   - Change Password\n"
        "   - Create a new password.\n\n"
        "Please choose a strong password and keep it confidential.\n\n"
        "Help & Support:\n"
        "If you encounter any issues, feel free to reach out to the support team at fusion@iiitdmj.ac.in, "
        "or fill out the Google form at: https://forms.gle/aHvzGoS9XAAoHyix6\n\n"
        "We look forward to your smooth experience with Fusion!\n\n"
        "Best regards,\n"
        "Fusion Development Team,\n"
        "PDPM IIITDM Jabalpur"
    )
    
    recipient_list = [f"{user['email']}"]
    if(int(settings.EMAIL_TEST_MODE) == 1):
        recipient_list = [settings.EMAIL_TEST_USER]
    send_email(
        subject=subject, message=message, recipient_list=recipient_list
    )   
    
def mail_to_user(created_users):
    try:
        for user in created_users:
            subject = 'Fusion Portal Credentials'
<<<<<<< HEAD
            message = f"Dear {user['username'].upper()}\n\nHere are your credentials for accessing your profile on the Fusion Portal. Please don't share these credentials with anyone as it is sensitive information; credentials are as follows:\nUsername: {user['username']}\nPassword: {user['password']}\n Kindly mention any issues with your credentials in this form:\n https://forms.gle/aHvzGoS9XAAoHyix6 \n\nCC Services\nComputer Centre\nPDPM IIITDM\nJabalpur."
=======
            message = f"Dear {user['username'].upper()}\n\nHere are your credentials for accessing your profile on the Fusion Portal. Please don't share these credentials with anyone as it is sensitive information; credentials are as follows:\nUsername: {user['username']}\nPassword: {user['password']}\n Kindly mention any issues in the credentials received in this form:\n https://forms.gle/aHvzGoS9XAAoHyix6\nCC Services\nComputer Centre\nPDPM IIITDM\nJabalpur."
>>>>>>> c6f8b41204283dbee2eb9fccc4d019ef5d1f3074
            recipient_list = [f"{user['email']}"]
            recipient_list = []
            send_email(subject=subject, message=message, recipient_list=recipient_list)
        return Response({"message": "Email sent successfully."}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def check_csv(headers):
    message = ''
    flag = True
    if(len(headers)<4):
        message = 'Please provide all the required fields in the csv file.'
        flag = False
    elif(headers[0].lower().find('roll')==-1 or headers[1].lower().find('name')==-1 or headers[2].lower().find('role')==-1 or headers[3].lower().find('admin')==-1):
        message = 'Requireds fields are not in the correct order. 1. Roll No. 2. Full Name 3. Role 4. Super Admin. Rest of the fields are optional.'
        flag = False
    return flag, message

def convert_to_iso(date_str):
    for fmt in ("%d-%m-%Y", "%d/%m/%Y", "%d/%m/%y", "%d-%m-%y"):
        try:
            date = datetime.strptime(date_str, fmt)
            print("date",date)
            return date.strftime("%Y-%m-%d")
        except ValueError:
            continue
    dummy_date = datetime.strptime("01-01-2004", "%d-%m-%Y")
    return dummy_date.strftime("%Y-%m-%d")

def format_phone_no(num):
    print("num",num)
    phone_no = str(num)
    if(len(phone_no)>10):
        formatted_phone_no = ''.join(phone_no[-10:])
    elif(len(phone_no)<10):
        formatted_phone_no = '0'
    else:
        formatted_phone_no = phone_no
    print(int(formatted_phone_no))
    return int(formatted_phone_no)

def get_department(rollno):
    bait = rollno[3]
    if(bait=='C'):
        dep = "CSE"
    elif(bait=='E'):
        dep = "ECE"
    elif(bait=='M'):
        dep = "ME"
    elif(bait=='S'):
        dep = "SM"
    else:
        dep = "Design"
    dep_name = GlobalsDepartmentinfo.objects.get(name=dep)
    print("dep_name",dep_name)
    return dep_name