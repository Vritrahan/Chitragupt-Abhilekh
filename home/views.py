from django.shortcuts import render, redirect
from django.http import HttpResponse
from home.forms import UserForm, UserProfileForm
from dashboard.views import index
from django.contrib.auth import authenticate, login


def front(request):
    return render(request, 'home/home.htm')


def register(request):
    registered = False

    if request.method == 'POST':
        user_form = UserForm(data=request.POST)
        profile_form = UserProfileForm(data=request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user = user_form.save()
            user.set_password(user.password)
            user.save()

            profile = profile_form.save(commit=False)
            profile.user = user
            profile.save()

            registered = True
        else:
            print(user_form.errors, profile_form.errors)

    return HttpResponse("Registered: %s" % registered)


def userLogin(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(username=username, password=password)

        if user:
            if user.is_active:
                login(request, user)
                return redirect(index)
            else:
                return HttpResponse("Account disabled")
        else:
            return HttpResponse("Invalid login details")
