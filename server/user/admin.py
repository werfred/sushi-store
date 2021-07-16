from django.contrib import admin
from .models import CustomerUser, Address
from django.contrib.auth.admin import UserAdmin


class AddressInline(admin.StackedInline):
    model = Address

    def get_max_num(self, request, obj=None, **kwargs):
        return 3

    def get_min_num(self, request, obj=None, **kwargs):
        return 0

    def get_extra(self, request, obj=None, **kwargs):
        return 0


class UserAdminConfig(UserAdmin):
    model = CustomerUser
    search_fields = ('email', 'last_name', 'first_name', 'phone_number')
    list_filter = ('email', 'last_name', 'first_name', 'phone_number', 'is_staff')
    ordering = ('-start_date',)
    list_display = ('email', 'last_name', 'first_name', 'phone_number', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'last_name', 'first_name', 'patronymic', 'phone_number')}),
        ('Permissions', {'fields': ('is_staff', )}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'last_name', 'first_name', 'phone_number', 'password1', 'password2', 'is_staff')}
         ),
    )

    inlines = [
        AddressInline,
    ]

    def full_name(self, obj):
        return str(obj)


admin.site.register(CustomerUser, UserAdminConfig)