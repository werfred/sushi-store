from django.contrib import admin
from django.db import models
from sushi.models import Sushi, Category
from django import forms


class SushiModelForm(forms.ModelForm):
    class Meta:
        model = Sushi
        fields = ('name', 'category', 'description', 'image', 'quantity', 'price', 'discount')


class SushiModelAdmin(admin.ModelAdmin):
    form = SushiModelForm

admin.site.register(Sushi, SushiModelAdmin)
admin.site.register(Category)