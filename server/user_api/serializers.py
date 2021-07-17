from rest_framework import serializers
from user.models import CustomerUser, Address
from phonenumber_field.modelfields import PhoneNumberField


class AddressSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Address
        fields = ['street_name', 'street_number', 'entrance_number', 'housing_number', 'apartment_number', 'floor_number']


class UserSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)
    phone_number = PhoneNumberField(unique=True)
    is_email_confirmed = serializers.BooleanField(read_only=True)
    email = serializers.EmailField(read_only=True)

    class Meta:
        model = CustomerUser
        fields = ['email', 'last_name', 'first_name', 'patronymic', 'phone_number', 'is_email_confirmed', 'addresses']

    def update(self, instance, validated_data):  
        try:
            addresses = validated_data.pop('addresses')
            if len(addresses) <= 3:
                Address.objects.filter(user=instance).delete()
                for address in addresses:
                    Address.objects.create(user=instance, **address)
        except KeyError:
            print("Addresses is not included.")
        except:
            pass

        return super(UserSerializer, self).update(instance, validated_data)


class RegisterUserSerializer(serializers.ModelSerializer):
    phone_number = PhoneNumberField(unique=True)
    email = serializers.EmailField()

    class Meta:
        model = CustomerUser
        fields = ('email', 'last_name', 'first_name', 'phone_number', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        instance.is_email_confirmed = False
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    def validate_email(self, value):
        lower_email = value.lower()
        if CustomerUser.objects.filter(email__iexact=lower_email).exists():
            raise serializers.ValidationError("Email already exists.")
        return lower_email
