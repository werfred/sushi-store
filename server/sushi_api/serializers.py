from rest_framework import serializers
from sushi.models import Sushi


class SushiSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.category_name')
    image = serializers.ImageField(
        max_length=None, use_url=True
    )

    class Meta:
        model = Sushi
        fields = ('id', 'slug', 'name', 'category_name',
                  'description', 'image', 'quantity', 'price', 'discount')
