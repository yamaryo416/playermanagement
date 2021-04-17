# Generated by Django 3.1.2 on 2021-04-14 09:24

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('email', models.EmailField(max_length=50, unique=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nickname', models.CharField(max_length=20)),
                ('is_coach', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(max_length=4, validators=[django.core.validators.RegexValidator(message='四桁の数字を入力してください。', regex='^[0-9]{4}')])),
            ],
        ),
        migrations.CreateModel(
            name='Training',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=20)),
                ('count', models.IntegerField(blank=True, null=True)),
                ('distance', models.IntegerField(blank=True, null=True)),
                ('description', models.CharField(blank=True, max_length=60, null=True)),
                ('nice_count', models.IntegerField(default=0)),
                ('nice_user', models.TextField(default='')),
                ('is_general', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('team_training', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='trainings', to='api.team')),
            ],
        ),
        migrations.CreateModel(
            name='TeamBoard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('introduction', models.CharField(blank=True, max_length=100, null=True)),
                ('coach', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='team_board', to='api.profile')),
                ('team', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='team_board', to='api.team')),
            ],
        ),
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('finished_member', models.TextField(default='')),
                ('finished_count', models.IntegerField(default=0)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('team_schedule', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='schedules', to='api.team')),
                ('training_schedule', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='schedules', to='api.training')),
            ],
        ),
        migrations.AddField(
            model_name='profile',
            name='team_prof',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='profiles', to='api.team'),
        ),
        migrations.AddField(
            model_name='profile',
            name='user_prof',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profile', to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('profile_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='api.profile')),
                ('team_board_post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='api.teamboard')),
            ],
        ),
    ]
