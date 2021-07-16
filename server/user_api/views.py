from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserSerializer, RegisterUserSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .tokens import account_activation_token
from django.core.mail import EmailMessage
from user.models import CustomerUser


def send_confirmation_email(request, user):
    current_site = get_current_site(request)
    mail_subject = 'Activate your sushi shop account.'
    message = f'http://{ current_site.domain }/api/user/activate/{ urlsafe_base64_encode(force_bytes(user.pk)) }/{ account_activation_token.make_token(user) }'
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

    def get(self, request, uidb64, token):
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = CustomerUser.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, CustomerUser.DoesNotExist):
            user = None
        if user is not None and account_activation_token.check_token(user, token):
            user.is_email_confirmed = True
            user.save()
            return Response('Thank you for your email confirmation. Now you can login your account.', status=status.HTTP_200_OK)
        else:
            return Response('Activation link is invalid!', status=status.HTTP_400_BAD_REQUEST)


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
