from rest_framework import serializers
from .models import GlobalsExtrainfo, GlobalsDesignation, GlobalsHoldsdesignation, AuthUser, GlobalsModuleaccess, Student, Batch, Curriculum, Discipline, Programme

class GlobalExtraInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsExtrainfo
        fields = '__all__'

class GlobalsDesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsDesignation
        fields = '__all__'
        
class GlobalsHoldsDesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsHoldsdesignation
        fields = '__all__'
        
class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = '__all__'
        
class GlobalsModuleaccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsModuleaccess
        fields = [
            'designation',
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

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'

class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batch
        fields = '__all__'

class CurriculumSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculum
        fields = '__all__'


class DisciplineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Discipline
        fields = '__all__'

class ProgrammeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Programme
        fields = '__all__'