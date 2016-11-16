# -*- coding: utf-8 -*-
# Generated by Django 1.10.2 on 2016-11-15 14:58
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20161014_1213'),
        ('dashboard', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Entry',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.IntegerField()),
                ('date', models.DateField()),
                ('cat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=128)),
                ('cat', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.Category')),
            ],
        ),
        migrations.AddField(
            model_name='entry',
            name='item',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dashboard.Item'),
        ),
        migrations.AddField(
            model_name='entry',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='home.UserProfile'),
        ),
    ]
