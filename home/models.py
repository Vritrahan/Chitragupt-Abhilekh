from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User)

    phone = models.CharField(max_length=128)
    organization = models.CharField(max_length=128)

    def __str__(self):
        return self.user.username
