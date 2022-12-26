from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view

def index(request):
    print('index')
    homepage = open('static/index.html').read()
    return HttpResponse(homepage)

# @api_view(['GET'])
# def whoami(request):
#     print("whoami")
#     user = {"name": "me", "email": "you@yahoo.com"}
#     return JsonResponse(data = user)

@api_view(['POST'])
def signIn(request):
    return JsonResponse({'success':True})

@api_view(['POST'])
def signUp(request):
    return JsonResponse({'success':True})

@api_view(['POST'])
def signOut(request):
    return JsonResponse({'success':True})