# Generated by Django 3.1.2 on 2021-03-16 23:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_schedule_training'),
    ]

    operations = [
        migrations.AlterField(
            model_name='training',
            name='description',
            field=models.CharField(blank=True, max_length=60, null=True),
        ),
    ]
