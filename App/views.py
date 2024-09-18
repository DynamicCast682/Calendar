from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes

from rest_framework.response import Response
from django.conf import settings


def index(request):
  return render(request, 'index.html')


@api_view(['GET'])
# @authentication_classes([TokenAuthentication])
# @permission_classes([IsAuthenticated])
def test_djangorestframework(request):
  return Response("yes")


def vite_django_test(request):
  return render(request, 'vite_django_test.html', context={
    'DEBUG': settings.DEBUG
  })
