from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import GlobalsExtrainfo
from .serializers import GlobalExtraInfoSerializer

@api_view(['GET'])
def global_extrainfo_list(request):
    records = GlobalsExtrainfo.objects.all()
    serializer = GlobalExtraInfoSerializer(records, many=True)
    return Response(serializer.data)