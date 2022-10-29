from django.shortcuts import render, HttpResponse, HttpResponseRedirect

# Create your views here.
def index(resquest):
  return HttpResponse('succes')