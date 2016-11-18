from django.conf.urls import url
from dashboard import views


urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^logout/', views.userLogout, name='userLogout'),
    url(r'^categories/', views.fetchCategory, name='fetchCategory'),
    url(r'^items/', views.fetchItems, name='fetchItems'),
    url(r'^categoryGraphData/', views.categoryGraphData, name='categoryGraphData'),
    url(r'^totalSalesData/', views.totalSalesData, name='totalSalesData'),
    url(r'^fetchProductData/', views.fetchProductData, name='fetchProductData'),
    url(r'^getDataForRestockTable/', views.getDataForRestockTable, name='getDataForRestockTable'),
    url(r'^getAllData/', views.getAllData, name='getAllData'),
    url(r'^outofstockitems/', views.outofstockitems, name='outofstockitems'),
    url(r'^lowstockitems/', views.lowstockitems, name='lowstockitems'),
    url(r'^checkout/', views.checkout, name='checkout'),
]
