from rest_framework import serializers
from sushi.models import Sushi, Category


class SushiSerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category.category_name')
    categoryNameRus = serializers.CharField(
        source='category.category_name_rus')
    categoryNameUkr = serializers.CharField(
        source='category.category_name_ukr')
    image = serializers.ImageField(
        max_length=None, use_url=True
    )

    class Meta:
        model = Sushi
        fields = ('id', 'slug', 'name', 'categoryName', 'categoryNameRus', 'categoryNameUkr',
                  'description', 'image', 'quantity', 'price', 'discount')


class CategorySerializer(serializers.ModelSerializer):
    categoryName = serializers.CharField(source='category_name')
    categoryNameRus = serializers.CharField(
        source='category_name_rus')
    categoryNameUkr = serializers.CharField(
        source='category_name_ukr')

    class Meta:
        model = Category
        fields = ('id', 'categoryName', 'categoryNameRus', 'categoryNameUkr')
