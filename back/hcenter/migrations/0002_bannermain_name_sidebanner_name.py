# Generated by Django 5.0.4 on 2024-05-03 08:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hcenter', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bannermain',
            name='name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='sidebanner',
            name='name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
    ]