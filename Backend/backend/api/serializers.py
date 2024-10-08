from rest_framework import serializers
from .models import GlobalsExtrainfo, GlobalsDesignation

class GlobalExtraInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsExtrainfo
        fields = '__all__'

class GlobalsDesignationSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsDesignation
        fields = '__all__'