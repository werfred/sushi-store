from rest_framework import serializers
from sushi.models import Sushi, Category, Ingredient


class ReadOnlyModelSerializer(serializers.ModelSerializer):
    def get_fields(self, *args, **kwargs):
        fields = super().get_fields(*args, **kwargs)
        for field in fields:
            fields[field].read_only = True
        return fields


class IngredientSerializer(ReadOnlyModelSerializer):
    nameRus = serializers.CharField(source='name_rus')
    nameUkr = serializers.CharField(source='name_ukr')

    class Meta:
        model = Ingredient
        fields = '__all__'


class SushiSerializer(ReadOnlyModelSerializer):
    categoryName = serializers.CharField(source='category.category_name')
    categoryNameRus = serializers.CharField(
        source='category.category_name_rus')
    categoryNameUkr = serializers.CharField(
        source='category.category_name_ukr')
    image = serializers.ImageField(
        max_length=None, use_url=True
    )
    ingredients = IngredientSerializer(many=True)

    next_slug = serializers.SerializerMethodField('get_next_slug')
    prev_slug = serializers.SerializerMethodField('get_prev_slug')

    def get_next_slug(self, sushi):
        try:
            slug = Sushi.objects.get(pk=sushi.id + 1).slug
        except Sushi.DoesNotExist:
            slug = Sushi.objects.order_by('id').first().slug
        return slug

    def get_prev_slug(self, sushi):
        try:
            slug = Sushi.objects.get(pk=sushi.id - 1).slug
        except Sushi.DoesNotExist:
            slug = Sushi.objects.order_by('id').last().slug
        return slug

    class Meta:
        model = Sushi
        fields = '__all__'


class CategorySerializer(ReadOnlyModelSerializer):
    categoryName = serializers.CharField(source='category_name')
    categoryNameRus = serializers.CharField(
        source='category_name_rus')
    categoryNameUkr = serializers.CharField(
        source='category_name_ukr')

    class Meta:
        model = Category
        fields = '__all__'
