from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterUserSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import EmailMessage
from user.models import CustomerUser
from cryptography.fernet import Fernet
from django.conf import settings
import jwt
import datetime


def int_to_bytes(x: int) -> bytes:
    return x.to_bytes((x.bit_length() + 7) // 8, 'big')


def int_from_bytes(xbytes: bytes) -> int:
    return int.from_bytes(xbytes, 'big')


def send_confirmation_email(request, user):
    cipher_suite = Fernet(settings.FERNET_KEY_EMAIL)
    encoded_user_id = cipher_suite.encrypt(int_to_bytes(user.pk))
    token = jwt.encode({"user_id": encoded_user_id.decode("utf-8")}, settings.SECRET_KEY, algorithm="HS256")
    current_site = get_current_site(request)
    mail_subject = 'Activate your sushi shop account.'
    message = f'http://{ current_site.domain }/api/user/activate/{ token }'
    email = EmailMessage(
        mail_subject, message, to=[user.email]
    )
    email.send()
    

class UserManageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)

        return Response(serializer.data)

    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserCreateView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        reg_serializer = RegisterUserSerializer(data=request.data)
        if reg_serializer.is_valid():
            user = reg_serializer.save()
            if user:
                send_confirmation_email(request, user)
                return Response(status=status.HTTP_201_CREATED)
        return Response(reg_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ActivationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        cipher_suite = Fernet(settings.FERNET_KEY_EMAIL)
        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = CustomerUser.objects.get(pk=int_from_bytes(cipher_suite.decrypt(str.encode(decoded_token['user_id']))))
        except:
            user = None
        if user is not None:
            if not user.is_email_confirmed:
                user.is_email_confirmed = True
                user.save()
                return Response('Thank you for your email confirmation. Now you can login your account.', status=status.HTTP_200_OK)
            else:
                return Response('Your account is already activated.', status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response('Activation link is invalid!', status=status.HTTP_404_NOT_FOUND)


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, token):
        cipher_suite = Fernet(settings.FERNET_KEY_PASSWORD)
        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            expire_date = datetime.datetime.fromtimestamp(decoded_token['expire_date'])
            user = CustomerUser.objects.get(pk=int_from_bytes(cipher_suite.decrypt(str.encode(decoded_token['user_id']))))
        except:
            user = None
        if user and expire_date > datetime.datetime.now() and user.is_email_confirmed:
            return Response('ok', status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        cipher_suite = Fernet(settings.FERNET_KEY_PASSWORD)
        try:
            email = request.POST.get('email')
            user = CustomerUser.objects.get(email=email)
            encoded_user_id = cipher_suite.encrypt(int_to_bytes(user.pk))
            token = jwt.encode({"user_id": encoded_user_id.decode("utf-8"), 
                                "expire_date": (datetime.datetime.now() + datetime.timedelta(hours=4)).timestamp()}, 
                                settings.SECRET_KEY, algorithm="HS256")
            current_site = get_current_site(request)
            mail_subject = 'Password reset.'
            message = f'http://{ current_site.domain }/api/user/reset/password/{ token }'
            email = EmailMessage(
                mail_subject, message, to=[user.email]
            )
            email.send()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        return Response(status=status.HTTP_200_OK)

    def put(self, request, token):
        cipher_suite = Fernet(settings.FERNET_KEY_PASSWORD)
        try:
            password = request.data.get('password')
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            expire_date = datetime.datetime.fromtimestamp(decoded_token['expire_date'])
            user = CustomerUser.objects.get(pk=int_from_bytes(cipher_suite.decrypt(str.encode(decoded_token['user_id']))))
        except:
            user = None
        if user and expire_date > datetime.datetime.now() and user.is_email_confirmed:
            user.set_password(password)
            user.save()
            if user.check_password(password):
                return Response('Password has been changed.', status=status.HTTP_200_OK)
            else:
                return Response('Password has not been changed.', status=status.HTTP_304_NOT_MODIFIED)
        else:
            return Response('Invalid data. Password has not been changed.', status=status.HTTP_400_BAD_REQUEST)


class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
