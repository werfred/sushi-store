from rest_framework import serializers
from sushi.models import Sushi, Category


class SushiSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category.category_name')
    image = serializers.ImageField(
        max_length=None, use_url=True
    )

    class Meta:
        model = Sushi
        fields = ('id', 'slug', 'name', 'categoryName',
                  'description', 'image', 'quantity', 'price', 'discount')


class CategorySerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category_name')

    class Meta:
        model = Category
        fields = ('id', 'categoryName')
