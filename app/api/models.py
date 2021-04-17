from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.conf import settings
from django.core.validators import RegexValidator
from django.utils import timezone

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None):

        if not email:
            raise ValueError('email is must')

        user = self.model(email=self.normalize_email(email))
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(max_length=50, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'

    def __str__(self):
        return self.email

class Team(models.Model):
    for_number_regex = RegexValidator(regex=r'^[0-9]{4}', message=("四桁の数字を入力してください。"))

    name = models.CharField(max_length=20, unique=True)
    password = models.CharField(validators=[for_number_regex], max_length=4)

    def __str__(self):
        return self.name

class Profile(models.Model):
    nickname = models.CharField(max_length=20)
    user_prof = models.OneToOneField(
        settings.AUTH_USER_MODEL, related_name="profile",
        on_delete=models.CASCADE
    )
    team_prof = models.ForeignKey(
        Team, related_name="profiles",
        blank=True, null=True,
        on_delete=models.SET_NULL
    )
    is_coach = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nickname

class TeamBoard(models.Model):
    introduction = models.CharField(max_length=100, blank=True, null=True)
    team = models.OneToOneField(
        Team, related_name="team_board",
        on_delete=models.CASCADE
    )
    coach = models.OneToOneField(
        Profile, related_name="team_board",
        on_delete=models.CASCADE
    )

class Training(models.Model):
    title = models.CharField(max_length=20)
    count = models.IntegerField(blank=True, null=True)
    distance = models.IntegerField(blank=True, null=True)
    description = models.CharField(max_length=60, blank=True, null=True)
    icon_number = models.IntegerField(blank=True, null=True)
    team_training = models.ForeignKey(
        Team, related_name="trainings",
        blank=True, null=True,
        on_delete=models.SET_NULL
    )
    nice_count = models.IntegerField(default=0)
    nice_user = models.TextField(default="")
    is_general = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Schedule(models.Model):
    training_schedule = models.ForeignKey(
        Training, related_name="schedules",
        on_delete=models.CASCADE
    )
    team_schedule = models.ForeignKey(
        Team, related_name="schedules",
        blank=True, null=True,
        on_delete=models.SET_NULL
    )
    date = models.DateField(default=timezone.now)
    finished_member = models.TextField(default='')
    finished_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.training_schedule.title

class Post(models.Model):
    text = models.CharField(max_length=100)
    team_board_post = models.ForeignKey(
        TeamBoard, related_name="posts",
        on_delete=models.CASCADE
    )
    profile_post = models.ForeignKey(
        Profile, related_name="posts",
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

