from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
# from django.contrib.auth import authenticate, login, logout
# from django.core import serializers
from .models import *

def index(request):
    print('index')
    homepage = open('static/index.html').read()
    return HttpResponse(homepage)

# @api_view(['GET'])
# def whoami(request):
#     print("whoami")
#     user = {"name": "me", "email": "you@yahoo.com"}
#     return JsonResponse(data = user)

# @api_view(['POST'])
def signIn(request):
    return JsonResponse({'success':True})

@api_view(['GET','POST'])
def signUp(request):
    print("---Sign Up Reached---")
    # print(request.data)
    email=request.data['email']
    password=request.data['password']
    print(email, password)
    try:
        AppUser.objects.create(email=email, password=password)
        return JsonResponse({'signup':True})
    except Exception as e:
        print(e)
        return JsonResponse({'signup':False})

# @api_view(['POST'])
def signOut(request):
    return JsonResponse({'success':True})