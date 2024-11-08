from rest_framework.response import Response
from rest_framework import status
import random
import string
from django.core.mail import send_mail
from django.conf import settings
from datetime import datetime
from .models import GlobalsDepartmentinfo, AuthUser, Student


def create_password(data):
    first_name = data.get('name').split(' ')[0].lower().capitalize()
    roll_no_part = data.get('rollNo')[-3:].upper()
    special_characters = string.punctuation
    random_specials = ''.join(random.choice(special_characters) for _ in range(2))
    return f"{first_name}{roll_no_part}{random_specials}"

def send_email(subject, message, from_email=settings.EMAIL_HOST_USER, recipient_list=['agarwalsamaksh11@gmail.com',]):
    if not from_email:
        return Response({"error": "No sender email provided."}, status=status.HTTP_400_BAD_REQUEST)
    send_mail(subject, message, from_email, recipient_list)
    
def mail_to_user(created_users):
    try:
        for user in created_users:
            subject = 'Fusion Portal Credentials'
            message = f"Dear {user['username'].upper()}\n\nHere are your credentials for accessing your profile on the Fusion Portal. Please don't share these credentials with anyone as it is sensitive information; credentials are as follows:\nUsername: {user['username']}\nPassword: {user['password']}\n\nCC Services\nComputer Centre\nPDPM IIITDM\nJabalpur."
            recipient_list = [f"{user['email']}"]
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