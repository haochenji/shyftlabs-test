from django.db import models

# Create your models here.
class Student(models.Model):
    first_name = models.CharField(max_length=128)
    family_name = models.CharField(max_length=128)
    date_of_birth = models.DateField()
    email = models.CharField(max_length=128)

    def __str__(self):
        return self.first_name+" "+self.family_name


class Course(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Student, through="Result")

    def __str__(self):
        return self.name


class Result(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    score = models.CharField(max_length=1)