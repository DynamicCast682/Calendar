from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authtoken.admin import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.authtoken.models import Token

from App.serializers import UserSerializer
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import authentication_classes, permission_classes


@api_view(['POST'])
def singup(request):
  serializer = UserSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    user: User = User.objects.get(username=serializer.data['username'])
    user.set_password(serializer.data['password'])
    user.save()
    token = Token.objects.create(user=user)
    return Response({'token': token.key, 'user': serializer.data})
  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
  user = get_object_or_404(User, username=request.data['username'])
  if not user.check_password(request.data['password']):
    return Response({'error': 'Invalid password'}, status=status.HTTP_400_NOT_FOUND)
  token, created = Token.objects.get_or_create(user=user)
  return Response({'token': token.key, 'user': UserSerializer(user).data})

#SessionAuthentication,

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
  return Response("passed!")
