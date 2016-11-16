# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-15 17:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dashboard', '0002_auto_20161115_1458'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='price',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='item',
            name='quantity',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
