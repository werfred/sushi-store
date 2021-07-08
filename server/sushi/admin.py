from django.contrib import admin
from django.db import models
from .models import Sushi, Category
from django import forms


class SushiModelForm(forms.ModelForm):

    category = forms.CharField(max_length=100)

    def __init__(self, *args, **kwargs):
        super(SushiModelForm, self).__init__(*args, **kwargs)
        self.fields['category'] = forms.ChoiceField(
            choices=[(c.category_name.lower().replace(' ', '_'), c.category_name) for c in Category.objects.all()]
        )
    

    class Meta:
        model = Sushi
        fields = ('name', 'category', 'description', 'image', 'quantity', 'price', 'discount')

class SushiModelAdmin(admin.ModelAdmin):
    form = SushiModelForm

admin.site.register(Sushi, SushiModelAdmin)
admin.site.register(Category)
