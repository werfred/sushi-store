from django.urls import path
from . import views


app_name = 'sushi_api'

urlpatterns = [
    path('', views.SushiList.as_view()),
    path('<int:pk>', views.SushiDetailId.as_view()),
    path('slug/<slug:slug>', views.SushiDetailSlug.as_view()),
    path('categories', views.CategoryList.as_view()),
]
