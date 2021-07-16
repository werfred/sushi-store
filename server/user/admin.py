from django.contrib import admin
from .models import CustomerUser, Address
from django.contrib.auth.admin import UserAdmin
from rest_framework_simplejwt.tokens import OutstandingToken


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
    list_display = ('email', 'last_name', 'first_name', 'phone_number', 'is_staff', 'is_email_confirmed')
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


class OutstandingTokenModelAdmin(admin.ModelAdmin):

    def check_perm(self, user_obj):
        if not user_obj.is_active or user_obj.is_anonymous:
            return False
        if user_obj.is_superuser or user_obj.is_staff:
            return True
        return False

    def has_view_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_delete_permission(self, request, obj=None):
        return self.check_perm(request.user)

    def has_module_permission(self, request):
        return self.check_perm(request.user)


admin.site.unregister(OutstandingToken)
admin.site.register(OutstandingToken, OutstandingTokenModelAdmin)
admin.site.register(CustomerUser, UserAdminConfig)