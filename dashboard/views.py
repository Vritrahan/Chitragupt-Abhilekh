from django.shortcuts import render, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import logout
from dashboard.models import Category, Item, Entry
from home.models import UserProfile
import home
import json


def index(request):
    if request.user.is_authenticated():
        return render(request, 'dashboard/dash.htm', {'username': request.user.username})
    else:
        return redirect(home.views.front)


def userLogout(request):
    logout(request)
    return JsonResponse({'flag': True})


def fetchCategory(request):
    responseData = {'categories': []}
    for cat in Category.objects.all():
        responseData['categories'].append(str(cat))
    return JsonResponse(responseData)


def fetchItems(request):
    cat = request.GET.get('category')
    if not cat:
        return JsonResponse({})
    Cat = Category.objects.get(name=cat)
    responseData = {'items': []}
    for itm in Item.objects.get(cat=Cat):
        responseData['items'].append(str(itm))
    return JsonResponse(responseData)


def categoryGraphData(request):
    responseData = {}
    for Cat in Category.objects.all():
        responseData[str(Cat)] = 0
        for itm in Item.objects.filter(cat=Cat):
            responseData[str(Cat)] += itm.quantity
    return JsonResponse(responseData)


def totalSalesData(request):
    responseData = {'data': []}
    for itm in Item.objects.all():
        sold = 0
        for entry in Entry.objects.filter(user=UserProfile.objects.get(user=request.user), item=itm):
            sold += entry.quantity
        responseData['data'].append({
            'item': itm.name,
            'category': itm.cat.name,
            'stock': itm.quantity,
            'sold': sold,
            'price': itm.price
        })
    return JsonResponse(responseData)


def fetchProductData(request):
    responseData = {}
    i = 1
    for Cat in Category.objects.all():
        responseData[str(Cat)] = {}
        for itm in Item.objects.filter(cat=Cat):
            responseData[str(Cat)][i] = {}
            responseData[str(Cat)][i]['item'] = itm.name
            responseData[str(Cat)][i]['price'] = itm.price
            responseData[str(Cat)][i]['quantity'] = itm.quantity
            i = i + 1
    return JsonResponse(responseData)


def getDataForRestockTable(request):
    responseData = {'data': []}
    for itm in Item.objects.all():
        responseData['data'].append({
            'item': itm.name,
            'category': itm.cat.name,
            'stock': itm.quantity,
            'price': itm.price
        })
    return JsonResponse(responseData)


def getAllData(request):
    responseData = {}
    for Cat in Category.objects.all():
        responseData[str(Cat)] = []
        for itm in Item.objects.filter(cat=Cat):
            responseData[str(Cat)].append({'item': itm.name})
    return JsonResponse(responseData)


def outofstockitems(request):
    responseData = {'data': []}
    for itm in Item.objects.all():
        if itm.quantity == 0:
            responseData['data'].append({
                'item': itm.name,
                'category': itm.cat.name
            })
    return JsonResponse(responseData)


def lowstockitems(request):
    responseData = {'data': []}
    for itm in Item.objects.all():
        if itm.quantity < 5:
            responseData['data'].append({
                'item': itm.name,
                'category': itm.cat.name,
                'stock': itm.quantity
            })
    return JsonResponse(responseData)


def checkout(request):
    requestBody = json.loads(request.body)
    requestList = requestBody['data']
    i = 0
    for ent in requestList:
        user = user = UserProfile.objects.get(user=request.user)
        cat = Category.objects.get(name=requestList[i]['category'])
        itm = Item.objects.get(name=requestList[i]['item'])
        entry = Entry(
            user=user, cat=cat, item=itm,
            quantity=requestList[i]['quantity'])
        itm.quantity += requestList[i]['quantity']
        itm.save()
        entry.save()
        i = i + 1
