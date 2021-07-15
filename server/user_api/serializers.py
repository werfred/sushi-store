from rest_framework import serializers
from user.models import CustomerUser, Address


class AddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Address
        fields = ['street_name', 'street_number', 'entrance_number', 'housing_number', 'apartment_number', 'floor_number']


class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)

    class Meta:
        model = CustomerUser
        fields = ['email', 'last_name', 'first_name', 'patronymic', 'phone_number', 'addresses']


class RegisterUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomerUser
        fields = ('email', 'last_name', 'first_name', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance