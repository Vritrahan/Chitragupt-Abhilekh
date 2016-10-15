from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import logout
import home


def index(request):
    if request.user.is_authenticated():
        return render(request, 'dashboard/dash.htm', {'username': request.user.username})
    else:
        return redirect(home.views.front)


def userLogout(request):
    logout(request)
    return redirect(home.views.front)
