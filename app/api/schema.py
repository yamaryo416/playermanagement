import graphene
import datetime
from graphene_django import DjangoObjectType
import graphql_jwt
from graphene_django.filter import DjangoFilterConnectionField
from graphene import relay
from graphql_jwt.decorators import login_required, user_passes_test
from graphql_relay import from_global_id
from .models import CustomUser, Profile, Team, TeamBoard, Training, Schedule, Post

class UserNode(DjangoObjectType):
    class Meta:
        model = CustomUser
        filter_fields = {
            'email': ['exact'],
        }
        interfaces = (relay.Node,)

class ProfileNode(DjangoObjectType):
    class Meta:
        model = Profile
        filter_fields = {
            'nickname': ['exact', 'icontains'],
            'user_prof__id': ['exact'],
        }
        interfaces = (relay.Node,)

class TeamNode(DjangoObjectType):
    class Meta:
        model = Team
        filter_fields = {
            'name': ['exact'],
            'password': ['exact'],
        }
        interfaces = (relay.Node,)

class TeamBoardNode(DjangoObjectType):
    class Meta:
        model = TeamBoard
        filter_fields = {
            'team__id': ['exact'],
        }
        interfaces = (relay.Node,)

class TrainingNode(DjangoObjectType):
    class Meta:
        model = Training
        filter_fields = {
            'title': ['exact', 'icontains'],
        }
        interfaces = (relay.Node,)

class ScheduleNode(DjangoObjectType):
    class Meta:
        model = Schedule
        filter_fields = {
           'date': ['exact'],
        }
        interfaces = (relay.Node,)

class PostNode(DjangoObjectType):
    class Meta:
        model = Post
        filter_fields = {
            'team_board_post_id': ['exact'],
        }
        interfaces = (relay.Node,)

class CreateUserMutation(relay.ClientIDMutation):
    class Input:
        email = graphene.String(required=True)
        password = graphene.String(required=True)

    user = graphene.Field(UserNode)

    def mutate_and_get_payload(root, info, **input):
        user=CustomUser(
            email=input.get('email'),
        )
        user.set_password(input.get('password'))
        user.save()

        return CreateUserMutation(user=user)

class CreateProfileMutation(relay.ClientIDMutation):
    class Input:
        nickname = graphene.String()

    profile = graphene.Field(ProfileNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        nickname = '名無し' if input.get('nickname') == '' else input.get('nickname')
        profile = Profile(
            nickname=nickname,
            user_prof=info.context.user
        )
        profile.save()

        return CreateProfileMutation(profile=profile)

class UpdatProfileMutation(relay.ClientIDMutation):
    class Input:
        nickname = graphene.String()
        team_prof = graphene.ID()
        is_coach = graphene.Boolean()

    profile = graphene.Field(ProfileNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        profile = Profile.objects.get(id=info.context.user.profile.id)

        if input.get('nickname') is not None:
            profile.nickname = input.get('nickname')
        if input.get('team_prof') is not None:
            profile.team_prof = Team.objects.get(id=from_global_id(input.get('team_prof'))[1])
            profile.is_coach = input.get('is_coach')
        profile.save()

        return UpdatProfileMutation(profile=profile)

class CreateTeamMutation(relay.ClientIDMutation):
    class Input:
        name = graphene.String(required=True)
        password = graphene.String(required=True)

    team = graphene.Field(TeamNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        team = Team(
            name=input.get('name'),
            password=input.get('password')
        )
        team.save()
        team_board = TeamBoard(
            team=team,
            coach_id=info.context.user.profile.id
        )
        team_board.save()

        return CreateTeamMutation(team=team)

class UpdateTeamBoardMutation(relay.ClientIDMutation):
    class Input:
        introduction = graphene.String(required=True)

    team_board = graphene.Field(TeamBoardNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        team_board = TeamBoard.objects.get(id=info.context.user.profile.team_prof.team_board.id)
        team_board.introduction = input.get("introduction")
        team_board.save()

        return UpdateTeamBoardMutation(team_board=team_board)

class CreateTrainingMutation(relay.ClientIDMutation):
    class Input:
        title = graphene.String(required=True)
        count = graphene.Int()
        distance = graphene.Int()
        description = graphene.String()
        icon_number =  graphene.Int()

    training = graphene.Field(TrainingNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        training = Training(
            title=input.get('title'),
            description=input.get('description'),
            team_training_id=info.context.user.profile.team_prof.id
        )
        if input.get('count') != 0:
            training.count = input.get('count')
        if input.get('distance') != 0:
            training.distance = input.get('distance')
        if input.get('icon_number') != 0:
            training.icon_number = input.get('icon_number')
        training.save()

        return CreateTrainingMutation(training=training)

class UpdateTrainingContentMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        title = graphene.String(required=True)
        count = graphene.Int()
        distance = graphene.Int()
        description = graphene.String()

    training = graphene.Field(TrainingNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        training = Training.objects.get(id=from_global_id(input.get('id'))[1])
        training.title = input.get('title')
        training.count = input.get('count')
        training.distance = input.get('distance')
        training.description = input.get('description')
        training.save()

        return UpdateTrainingContentMutation(training=training)

class UpdateTrainingNiceMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        user_id = graphene.String(required=True)

    training = graphene.Field(TrainingNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        training = Training.objects.get(id=from_global_id(input.get('id'))[1])
        user = input.get("user_id")
        if user in training.nice_user:
            users = training.nice_user.replace("/" + user, '')
            training.nice_count -= 1
        else:
            users = '{}/{}'.format(training.nice_user, user)
            training.nice_count += 1
        training.nice_user = users
        training.save()

        return UpdateTrainingNiceMutation(training=training)

class CreateScheduleMutation(relay.ClientIDMutation):
    class Input:
        training_schedule = graphene.ID(required=True)
        date = graphene.Date(required=True)

    schedule = graphene.Field(ScheduleNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        schedule = Schedule(
            team_schedule_id=info.context.user.profile.team_prof.id,
            date=input.get('date')
        )
        schedule.training_schedule = Training.objects.get(id=from_global_id(input.get('training_schedule'))[1])
        schedule.save()

        return CreateScheduleMutation(schedule=schedule)

class CreateManySchedulesMutation(relay.ClientIDMutation):
    class Input:
        training_schedule = graphene.ID(required=True)
        start_date = graphene.Date(required=True)
        end_date = graphene.Date(required=True)
        day_of_week = graphene.String(required=True)

    schedule = graphene.Field(ScheduleNode)

    @login_required
    @user_passes_test(lambda use: use.profile.is_coach)
    def mutate_and_get_payload(root, info, **input):
        start = input.get('start_date')
        end = input.get('end_date')
        training_schedule = Training.objects.get(id=from_global_id(input.get('training_schedule'))[1])
        day_of_week = input.get('day_of_week')

        while start <= end:
            if str(start.weekday()) in day_of_week:
                schedule = Schedule(
                    team_schedule=info.context.user.profile.team_prof,
                    date=start
                )
                schedule.training_schedule = training_schedule
                schedule.save()
            start += datetime.timedelta(days=1)
        schedule = Schedule(
            team_schedule=info.context.user.profile.team_prof,
            date=datetime.date(2000, 1, 1)
        )
        schedule.training_schedule = training_schedule
        schedule.save()

        return CreateManySchedulesMutation(schedule=schedule)

class CreatePostMutation(relay.ClientIDMutation):
    class Input:
        text = graphene.String(required=True)

    post = graphene.Field(PostNode)

    @login_required
    def mutate_and_get_payload(root, info, **input):
        text = input.get("text")
        post = Post(
            text=text,
            team_board_post=info.context.user.profile.team_prof.team_board,
            profile_post=info.context.user.profile
        )
        post.save()

        return CreatePostMutation(post=post)

class Mutation(graphene.AbstractType):
    create_user = CreateUserMutation.Field()
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    create_profile = CreateProfileMutation.Field()
    update_profile = UpdatProfileMutation.Field()
    create_team = CreateTeamMutation.Field()
    update_team_board = UpdateTeamBoardMutation.Field()
    create_training = CreateTrainingMutation.Field()
    update_training_nice = UpdateTrainingNiceMutation.Field()
    create_schedule = CreateScheduleMutation.Field()
    create_many_schedules = CreateManySchedulesMutation.Field()
    create_post = CreatePostMutation.Field()
    
class Query(graphene.ObjectType):
    profile = graphene.Field(ProfileNode)
    team = graphene.Field(TeamNode,
                          name=graphene.NonNull(graphene.String),
                          password=graphene.NonNull(graphene.String))
    my_trainings = DjangoFilterConnectionField(TrainingNode)
    my_all_schedules = DjangoFilterConnectionField(ScheduleNode)
    my_week_schedules = DjangoFilterConnectionField(ScheduleNode,
                                                    first_date=graphene.NonNull(graphene.Date))
    training = graphene.Field(TrainingNode,
                              id=graphene.NonNull(graphene.ID))
    all_users = DjangoFilterConnectionField(UserNode)
    all_profiles = DjangoFilterConnectionField(ProfileNode)
    all_team = DjangoFilterConnectionField(TeamNode)
    my_team_posts = DjangoFilterConnectionField(PostNode)

    @login_required
    def resolve_profile(self, info, **kwargs):
        return Profile.objects.get(user_prof=info.context.user.id)

    @login_required
    def resolve_team(self, info, **kwargs):
        name = kwargs.get('name')
        password = kwargs.get('password')
        if name is not None and password is not None:
            return Team.objects.get(name=name, password=password)

    @login_required
    def resolve_my_trainings(self, info, **kwargs):
        return Training.objects.filter(team_training=info.context.user.profile.team_prof).order_by('-created_at')

    @login_required
    def resolve_my_all_schedules(self, info, **kwargs):
        return Schedule.objects.filter(team_schedule=info.context.user.profile.team_prof)

    @login_required
    def resolve_my_week_schedules(self, info, **kwargs):
        first_date = kwargs.get('first_date')
        return Schedule.objects.filter(date__range=(first_date, first_date + datetime.timedelta(days=6)), team_schedule=info.context.user.profile.team_prof)

    @login_required
    def resolve_training(self, info, **kwargs):
        id = kwargs.get('id')
        return Training.objects.get(id=from_global_id(id)[1])

    @login_required
    def resolve_all_users(self, info, **kwargs):
        return CustomUser.objects.all()

    @login_required
    def resolve_all_profiles(self, info, **kwargs):
        return Profile.objects.all()

    @login_required
    def resolve_all_team(self, info, **kwargs):
        return Team.objects.all()

    @login_required
    def resolve_my_team_posts(self, info, **kwargs):
        return Post.objects.filter(team_board_post=info.context.user.profile.team_prof.team_board).order_by('-created_at')



