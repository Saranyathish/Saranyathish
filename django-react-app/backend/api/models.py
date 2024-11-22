from django.db import models

class UserRegister(models.Model):
    username = models.CharField(max_length=100)
    email = models.EmailField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return str(self.username)
