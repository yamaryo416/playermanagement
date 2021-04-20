export type Maybe<T> = T | null;

type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Date: any;
  };

export type MyProfileType = {
  profile: {
    id: Scalars['ID'];
    nickname: Scalars['String'];
    userProf: {
      id: Scalars['ID'];
    };
    teamProf: {
      name: Scalars['String'];
      teamBoard: {
        introduction: Scalars["String"];
        coach: {
          nickname: Scalars['String'];
        }
      };
    };
    isCoach: Scalars['Boolean'];
  }
}

export type OneTeamFromNameType = {
  teamFromName: {
    id: Scalars['ID'];
    name: Scalars['String'];
    teamBoard: {
      introduction: Scalars['String'];
      joinCount: Scalars['Int'];
      coach: {
        nickname: Scalars['String'];
      }
    }
  }
}

export type OneTeamFromIdType = {
  teamFromId: {
    id: Scalars['ID'];
    name: Scalars['String'];
    teamBoard: {
      introduction: Scalars['String'];
      joinCount: Scalars["Int"];
      coach: {
        nickname: Scalars['String'];
      }
    }
    schedules: {
      edges:  Maybe<Array<ScheduleType>>;
    }
    trainings: {
      edges: Maybe<Array<TrainingType>>;
    }
  }
}

export type TeamVars = {
  name: Scalars['String'];
  password: Scalars['String'];
}

export type TeamBoardType = {
  node: {
    id: Scalars['ID'];
    introduction: Scalars['String'];
    joinCount: Scalars['Int'];
    coach: {
      nickname: Scalars['String'];
    }
    team: {
      id: Scalars['ID'];
      name: Scalars['String'];
    }
  }
}

export type TrainingType = {
    node: {
        id: Scalars['ID'];
        title: Scalars['String'];
        count: Scalars['Int'];
        load: Scalars['Int'];
        distance: Scalars['Int'];
        description: Scalars['String'];
        iconNumber: Scalars['Int']
        niceCount: Scalars['Int'];
        niceUser: Scalars['String'];
    };
  };

export type ScheduleType = {
    node: {
      id: Scalars['ID'];
      date: Scalars['Date'];
      trainingSchedule: {
        id: Scalars['ID'];
        title: Scalars['String'];
        count: Scalars['Int'];
        load: Scalars['Int'];
        distance: Scalars['Int'];
        description: Scalars['String'];
        iconNumber: Scalars['Int'];
      };
      finishedMember: Scalars['String'];
      finishedCount: Scalars['Int'];
    };
  }

  export type SingleTrainingType = {
    training: {
      title: Scalars['String'];
      count: Scalars['Int'];
      load: Scalars['Int'];
      distance: Scalars['Int'];
      description: Scalars['String'];
    }
  }

  export type AllTeamBoardType = {
    allTeamBoard: {
      edges: Maybe<Array<TeamBoardType>>;
    }
  }

  export type MyTrainingsType = {
      myTrainings: {
        edges: Maybe<Array<TrainingType>>;
      };
  };

  export type MyWeekSchedulesType = {
    myWeekSchedules: {
      edges: Maybe<Array<ScheduleType>>;
    }
  }

  export type MyAllSchedulesType = {
    myAllSchedules: {
      edges: Maybe<Array<ScheduleType>>;
    }
  }

  type PostType = {
    node: {
      text: Scalars['String'];
      profilePost: {
        id: Scalars["ID"];
        nickname: Scalars['String'];
      };
    }
  }

  export type MyTeamPostsType = {
    myTeamPosts: {
      edges: Maybe<Array<PostType>>;
    }
  }
