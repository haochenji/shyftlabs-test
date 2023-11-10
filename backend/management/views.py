from django.shortcuts import render

from rest_framework import viewsets
from .serializers import StudentSerializer, CourseSerializer, ResultGetSerializer, ResultSetSerializer
from .models import Student, Course, Result

# Create your views here.

class StudentView(viewsets.ModelViewSet):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class CourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    queryset = Course.objects.all()

class ResultGetView(viewsets.ModelViewSet):
    serializer_class = ResultGetSerializer
    queryset = Result.objects.all()

class ResultSetView(viewsets.ModelViewSet):
    serializer_class = ResultSetSerializer
    queryset = Result.objects.all()