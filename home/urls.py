from django.conf.urls import url
from home import views


urlpatterns = [
    url(r'^$', views.front, name='front'),
    url(r'^register/', views.register, name='register'),
    url(r'^login/', views.userLogin, name='login'),
]
