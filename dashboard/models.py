from django.db import models
from home.models import UserProfile


class Category(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Item(models.Model):
    cat = models.ForeignKey(Category)

    name = models.CharField(max_length=128)
    quantity = models.IntegerField()
    price = models.FloatField()

    def __str__(self):
        return self.name


class Entry(models.Model):
    user = models.ForeignKey(UserProfile)
    cat = models.ForeignKey(Category)
    item = models.ForeignKey(Item)

    quantity = models.IntegerField()
    # date = models.DateField()

    def __str__(self):
        return self.item
