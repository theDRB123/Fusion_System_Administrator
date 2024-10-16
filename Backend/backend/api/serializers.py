from rest_framework import serializers
from .models import GlobalsExtrainfo, GlobalsDesignation, AuthUser, GlobalsModuleaccess

class GlobalExtraInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsExtrainfo
        fields = '__all__'

class GlobalsDesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsDesignation
        fields = '__all__'
        
class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = '__all__'
        
class GlobalsModuleaccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsModuleaccess
        fields = [
            'program_and_curriculum',
            'course_registration',
            'course_management',
            'other_academics',
            'spacs',
            'department',
            'examinations',
            'hr',
            'iwd',
            'complaint_management',
            'fts',
            'purchase_and_store',
            'rspc',
            'hostel_management',
            'mess_management',
            'gymkhana',
            'placement_cell',
            'visitor_hostel',
            'phc'
        ]