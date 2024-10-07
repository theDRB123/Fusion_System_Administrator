from rest_framework import serializers
from .models import GlobalsExtrainfo

class GlobalExtraInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GlobalsExtrainfo
        fields = '__all__'