from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
import rest_framework.status as status
from sushi.models import Sushi
from .serializers import SushiSerializer

# Create your views here.

@api_view(['GET'])
def sushi_detail(request, pk):

    try:
        sushi = Sushi.objects.get(pk=pk)
    except Sushi.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = SushiSerializer(sushi, context={'request': request})
        return Response(serializer.data)


@api_view(['GET'])
def sushi_list(request):
    if request.method == 'GET':
        data = []
        nextPage = 1
        previousPage = 1
        sushi = Sushi.objects.all()
        page = request.GET.get('page', 1)
        paginator = Paginator(sushi, 5)
        try:
            data = paginator.page(page)
        except PageNotAnInteger:
            data = paginator.page(1)
        except EmptyPage:
            data = paginator.page(paginator.num_pages)

        serializer = SushiSerializer(data, context={'request': request}, many=True)
        if data.has_next():
            nextPage = data.next_page_number()
        if data.has_previous():
            previousPage = data.previous_page_number()
        
        return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '/sushi/?page=' + str(nextPage), 'prevlink': '/sushi/?page=' + str(previousPage)})