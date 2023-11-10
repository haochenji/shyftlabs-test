from rest_framework import serializers
from .models import Student, Course, Result

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ('id', 'first_name', 'family_name', 'date_of_birth', 'email')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'name')

class ResultGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ('id', 'student', 'course', 'score')
        depth = 1

class ResultSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = ('id', 'student', 'course', 'score')