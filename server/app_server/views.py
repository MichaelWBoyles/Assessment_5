from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
from django.core import serializers
from .models import *
import random

def index(request):
    print('index')
    homepage = open('static/index.html').read()
    return HttpResponse(homepage)

# @api_view(['GET'])
# def whoami(request):
#     print("whoami")
#     user = {"name": "me", "email": "you@yahoo.com"}
#     return JsonResponse(data = user)

@api_view(['GET','POST'])
def signIn(request):
    print("---Sign In Reached---")
    print(request.data)
    email=request.data['email']
    password=request.data['password']
    user=authenticate(username=email, password=password)
    print(f'User: {user}')
    if user is not None and user.is_active:
        try:
            login(request._request, user)
            print('True')
            return JsonResponse({'signIn':True})
        except Exception as e:
            print(e)
            print('False')
            return JsonResponse({'signIn':False})
    else:
        print('User/password Not Found')
        return JsonResponse({'signIn':False})


@api_view(['GET'])
def curr_user(request):
    print("---Curr User Reached---")
    if request.user.is_authenticated:
        data=serializers.serialize("json", [request.user], fields=['email','wealth','picture'])
        return HttpResponse(data)
    else:
        return JsonResponse({"user":None})



@api_view(['GET','POST'])
def signUp(request):
    print("---Sign Up Reached---")
    # print(request.data)
    email=request.data['email']
    password=request.data['password']
    # print(email, password)
    try:
        AppUser.objects.create_user(username=email,email=email, password=password, wealth=200, picture=random.randint(1, 826))
        # print('True')
        return JsonResponse({'signup':True})
    except Exception as e:
        print(e)
        # print('False')
        return JsonResponse({'signup':False})
    # return JsonResponse({'signup':False})


@api_view(['GET','POST'])
def signOut(request):
    print("---Sign Out Reached---")
    try:
        logout(request)
        print(f"Loged Out {request.data}")
        return JsonResponse({'signout':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signout':False})

@api_view(['GET','POST'])
def upDate(request):
    print("---Updating---")
    print(request.data)
    print(request.method)
    value = request.data['value']
    temp = request.user
    print(request.user)
    # print(AppUser.objects.get)
    return JsonResponse({'signout':True})