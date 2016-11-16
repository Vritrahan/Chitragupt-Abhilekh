from django.contrib import admin
from dashboard.models import Category
from dashboard.models import Item
from dashboard.models import Entry


admin.site.register(Category)
admin.site.register(Item)
admin.site.register(Entry)
