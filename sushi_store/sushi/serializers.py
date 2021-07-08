from rest_framework import serializers
from .models import Sushi

class SushiSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sushi
        fields = ('pk','name', 'description', 'quantity', 'price')