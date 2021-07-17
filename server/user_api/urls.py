from django.urls import path
from . import views

app_name = 'user_api'

urlpatterns = [
    path('', views.UserManageView.as_view(), name='manage_user'),
    path('register/', views.UserCreateView.as_view(), name="create_user"),
    path('activate/<token>/', views.ActivationView.as_view(), name='activate'),
    path('logout/blacklist/', views.BlacklistTokenUpdateView.as_view(),
         name='blacklist'),
]