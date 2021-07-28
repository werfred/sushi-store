from rest_framework import serializers
from rest_framework.exceptions import NotAcceptable, ParseError
from user.models import CustomerUser, Address
from phonenumber_field.serializerfields import PhoneNumberField


class TooMuchAddressesError(Exception):
    def __init__(self, message='Too much addresses. Addresses number cannot exceed 3.'):
        super().__init__(message)


class AddressSerializer(serializers.ModelSerializer):
    streetName = serializers.CharField(source='street_name')
    streetNumber = serializers.CharField(source='street_number')
    entranceNumber = serializers.CharField(
        source='entrance_number', required=False)
    housingNumber = serializers.CharField(
        source='housing_number', required=False)
    apartmentNumber = serializers.CharField(
        source='apartment_number', required=False)
    floorNumber = serializers.CharField(source='floor_number', required=False)

    class Meta:
        model = Address
        fields = ['streetName', 'streetNumber', 'entranceNumber',
                  'housingNumber', 'apartmentNumber', 'floorNumber']


class UserSerializer(serializers.ModelSerializer):
    lastName = serializers.CharField(source='last_name')
    firstName = serializers.CharField(source='first_name')
    addresses = AddressSerializer(many=True, required=False)
    phoneNumber = PhoneNumberField(source='phone_number')
    isEmailConfirmed = serializers.BooleanField(
        read_only=True, source='is_email_confirmed')
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = CustomerUser
        fields = ['email', 'lastName', 'firstName', 'patronymic',
                  'phoneNumber', 'isEmailConfirmed', 'addresses']

    def update(self, instance, validated_data):
        try:
            addresses = validated_data.pop('addresses')
            if len(addresses) <= 3:
                Address.objects.filter(user=instance).delete()
                for address in addresses:
                    Address.objects.create(user=instance, **address)
                return super(UserSerializer, self).update(instance, validated_data)
            else:
                raise TooMuchAddressesError
        except KeyError:
            error = {'message': 'Addresses is not included.'}
            raise ParseError(error)
        except TooMuchAddressesError as e:
            error = {'message': str(e)}
            raise NotAcceptable(error)

    def validate_phoneNumber(self, value):
        if CustomerUser.objects.filter(phone_number__iexact=value).exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value


class RegisterUserSerializer(serializers.ModelSerializer):
    lastName = serializers.CharField(source='last_name')
    firstName = serializers.CharField(source='first_name')
    addresses = AddressSerializer(many=True, required=False)
    phoneNumber = PhoneNumberField(source='phone_number')
    email = serializers.EmailField()

    class Meta:
        model = CustomerUser
        fields = ('email', 'lastName', 'firstName', 'patronymic',
                  'phoneNumber', 'password', 'addresses')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        try:
            addresses = validated_data.pop('addresses')
        except KeyError:
            addresses = []
        try:
            if len(addresses) <= 3:
                password = validated_data.pop('password', None)
                instance = self.Meta.model(**validated_data)
                instance.is_email_confirmed = False
                if password is not None:
                    instance.set_password(password)
                for address in addresses:
                    Address.objects.create(user=instance, **address)
            else:
                raise Exception('To many addresses included.')
        except TooMuchAddressesError as e:
            error = {'message': str(e)}
            raise NotAcceptable(error)
        instance.save()
        return instance

    def validate_email(self, value):
        lower_email = value.lower()
        if CustomerUser.objects.filter(email__iexact=lower_email).exists():
            raise serializers.ValidationError("Email already exists.")
        return lower_email

    def validate_phoneNumber(self, value):
        if CustomerUser.objects.filter(phone_number__iexact=value).exists():
            raise serializers.ValidationError("Phone number already exists.")
        return value
