from django.shortcuts import render
from django.http import HttpResponse


def about(request):
    info = "<h1>Chitragupt Abhilekh</h1>\
            <h4>An inventory management system</h4>\
            <p>By Vitrahan and BlackKobra</p>"
    return HttpResponse(info)
