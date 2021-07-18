from django.urls import path
from . import views

app_name = 'sushi_api'

urlpatterns = [
    path('', views.SushiList.as_view()),
    path('<int:pk>', views.SushiDetail.as_view()),
]