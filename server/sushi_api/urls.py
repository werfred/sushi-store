from django.urls import path
from . import views


application_name = 'sushi_api'

urlpatterns = [
    path('', views.sushi_list),
    path('<int:pk>', views.sushi_detail),
]