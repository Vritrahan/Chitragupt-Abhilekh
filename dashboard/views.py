from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import logout
from dashboard.models import Category, Item
import home
import json


def index(request):
    if request.user.is_authenticated():
        return render(request, 'dashboard/dash.htm', {'username': request.user.username})
    else:
        return redirect(home.views.front)


def userLogout(request):
    logout(request)
    return redirect(home.views.front)


def fetchCategory(request):
    responseData = {'categories': []}
    for cat in Category.objects.all():
        responseData['categories'].append(str(cat))
    return HttpResponse(json.dumps(responseData), content_type="application/json")


def fetchItems(request):
    cat = request.GET.get('category')
    if not cat:
        return HttpResponse(json.dumps({}), content_type="application/json")
    Cat = Category.objects.get(name=cat)
    responseData = {'items': []}
    for itm in Item.objects.get(cat=Cat):
        responseData['items'].append(str(itm))
    return HttpResponse(json.dumps(responseData), content_type="application/json")
