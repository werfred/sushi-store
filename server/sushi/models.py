from django.db import models

# Create your models here.
class Category(models.Model):
    category_name = models.CharField(max_length=100)

    def __str__(self) -> str:
        return self.category_name

    class Meta:
        verbose_name_plural = "Categories"


class Sushi(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(
        Category, on_delete=models.PROTECT, default=1)
    image = models.ImageField(upload_to ='img/', null=True)
    description = models.TextField(default='')
    quantity = models.PositiveSmallIntegerField(default=1)
    price = models.DecimalField(default=0.0, max_digits=6, decimal_places=2)
    discount = models.DecimalField(default=0.0, max_digits=3, decimal_places=2)

    def is_discounted(self):
        if self.discount > 0:
            return True
        else:
            return False

    def __str__(self) -> str:
        return self.name

    class Meta:
        verbose_name_plural = "Sushi"
