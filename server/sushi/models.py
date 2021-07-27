from django.db import models
from django.conf import settings
from .slugify import slugify


class Category(models.Model):
    category_name = models.CharField(max_length=100, null=False, unique=True)
    category_name_ukr = models.CharField(max_length=100, null=False)
    category_name_rus = models.CharField(max_length=100, null=False)

    def __str__(self) -> str:
        return self.category_name

    class Meta:
        verbose_name_plural = "Categories"


class Ingredient(models.Model):
    name = models.CharField(max_length=100, null=False, unique=True)
    name_ukr = models.CharField(max_length=100, null=False)
    name_rus = models.CharField(max_length=100, null=False)

    image = models.ImageField(
        upload_to=settings.MEDIA_ROOT_PATH + 'ingredients/')

    def __str__(self) -> str:
        return f'{self.name}'

    class Meta:
        verbose_name_plural = "Ingredients"


class Sushi(models.Model):
    name = models.CharField(max_length=100, null=False)
    image = models.ImageField(upload_to=settings.MEDIA_ROOT_PATH, null=True)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name='category')
    ingredients = models.ManyToManyField(
        Ingredient, through='SetOfIngredients')
    description = models.TextField(default='')
    quantity = models.PositiveSmallIntegerField(default=1)
    price = models.DecimalField(default=0.0, max_digits=6, decimal_places=2)
    discount = models.DecimalField(default=0.0, max_digits=3, decimal_places=2)
    slug = models.SlugField(max_length=255)

    def save(self, *args, **kwargs):
        # img_path = self.image.url.replace(settings.MEDIA_URL, '').replace(
        #     settings.MEDIA_ROOT_PATH, '').split('.')[0].split('_')[0]
        if not self.slug:
            self.slug = slugify(self.name)
        super(Sushi, self).save(*args, **kwargs)

    def is_discounted(self):
        if self.discount > 0:
            return True
        else:
            return False

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = "Sushi"


class SetOfIngredients(models.Model):
    sushi = models.ForeignKey(Sushi, on_delete=models.CASCADE)
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.ingredient.name
