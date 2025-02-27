# Generated by Django 5.1.6 on 2025-02-27 13:38

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='attendees',
        ),
        migrations.AddField(
            model_name='room',
            name='attendees',
            field=models.ManyToManyField(related_name='room_attendees', to=settings.AUTH_USER_MODEL),
        ),
    ]
