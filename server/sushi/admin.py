from django.contrib import admin
from sushi.models import Sushi, Category, SetOfIngredients, Ingredient
from django import forms


class CategoryModelAdmin(admin.ModelAdmin):
    def check_perm(self, user_obj):
        if not user_obj.is_active or user_obj.is_anonymous:
            return False
        if user_obj.is_superuser or user_obj.is_staff:
            return True
        return False

    def has_view_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_add_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_change_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_delete_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_module_permission(self, request):
        return self.check_perm(request.user)


class IngredientModelAdmin(admin.ModelAdmin):
    def check_perm(self, user_obj):
        if not user_obj.is_active or user_obj.is_anonymous:
            return False
        if user_obj.is_superuser or user_obj.is_staff:
            return True
        return False

    def has_view_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_add_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_change_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_delete_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_module_permission(self, request):
        return self.check_perm(request.user)


class IngredientsInline(admin.StackedInline):

    model = SetOfIngredients
    verbose_name = "Ingredient"
    verbose_name_plural = "Ingredients"

    def get_max_num(self, request, obj=None, **kwargs):
        return 3

    def get_min_num(self, request, obj=None, **kwargs):
        return 0

    def get_extra(self, request, obj=None, **kwargs):
        return 0


class SushiModelForm(forms.ModelForm):
    class Meta:
        model = Sushi
        fields = ('name', 'category', 'description',
                  'image', 'quantity', 'price', 'discount')


class SushiModelAdmin(admin.ModelAdmin):
    form = SushiModelForm

    inlines = [
        IngredientsInline,
    ]

    def check_perm(self, user_obj):
        if not user_obj.is_active or user_obj.is_anonymous:
            return False
        if user_obj.is_superuser or user_obj.is_staff:
            return True
        return False

    def has_view_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_add_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_change_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_delete_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_module_permission(self, request):
        return self.check_perm(request.user)


admin.site.register(Sushi, SushiModelAdmin)
admin.site.register(Ingredient, IngredientModelAdmin)
admin.site.register(Category, CategoryModelAdmin)
