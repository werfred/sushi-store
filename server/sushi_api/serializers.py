from rest_framework import serializers
from sushi.models import Sushi


class SushiSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name')

    class Meta:
        model = Sushi
        fields = ('name', 'category_name', 'description', 'image', 'quantity', 'price', 'discount')