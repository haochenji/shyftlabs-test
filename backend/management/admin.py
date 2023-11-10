from django.contrib import admin
from .models import Student, Course, Result

class StudentAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'family_name', 'date_of_birth', 'email')

class CourseAdmin(admin.ModelAdmin):
    list_display = ('name',)

class ResultAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'score')

# Register your models here.

admin.site.register(Student, StudentAdmin)
admin.site.register(Course, CourseAdmin)
admin.site.register(Result, ResultAdmin)