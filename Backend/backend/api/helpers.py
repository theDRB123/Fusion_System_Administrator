from rest_framework.response import Response
from rest_framework import status
import random
import string
from django.core.mail import send_mail
from django.conf import settings


def create_password(data):
    first_name = data.get('name').split(' ')[0].capitalize()
    roll_no_part = data.get('rollNo')[-3:].upper()
    special_characters = string.punctuation
    random_specials = ''.join(random.choice(special_characters) for _ in range(2))
    return f"{first_name}{roll_no_part}{random_specials}"

def send_email(subject, message, from_email=settings.EMAIL_HOST_USER, recipient_list=['agarwalsamaksh11@gmail.com',]):
    if not from_email:
        return Response({"error": "No sender email provided."}, status=status.HTTP_400_BAD_REQUEST)
    send_mail(subject, message, from_email, recipient_list)
    
def mail_to_new_user(created_users):
    try:
        for user in created_users:
            subject = 'Institute Mail ID Credentials'
            message = f"Dear {user['first_name'].upper()} {user['last_name'].upper()}\n\nWelcome to PDPM IIITDMJ. You have been provided Institute mail id; details are as follows:\n\nEmail ID: {user['email']}\nPassword: {user['password']}\n\nCC Services\nComputer Centre\nPDPM IIITDM\nJabalpur."
            # recipient_list = [f"{user['email']}"]
            recipient_list = ['agarwalsamaksh11@gmail.com']
            send_email(subject=subject, message=message, recipient_list=recipient_list)
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