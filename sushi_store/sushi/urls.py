from django.urls import path
from . import views

urlpatterns = [
    path('', views.sushi_list),
    path('<int:pk>', views.sushi_detail),
]
