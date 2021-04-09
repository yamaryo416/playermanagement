type Maybe<T> = T | null;

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
    };
    isCoach: Scalars['Boolean'];
  }
}

export type OneTeamType = {
  team: {
    id: Scalars['ID'];
    name: Scalars['String'];
  }
}

export type OneTeamVars = {
  name: Scalars['String'];
  password: Scalars['String'];
}


type TrainingType = {
    node: {
        id: Scalars['ID'];
        title: Scalars['String'];
    };
  };

export type ScheduleType = {
    node: {
      date: Scalars['Date'];
      trainingSchedule: {
        title: Scalars['String'];
        count: Scalars['Int'];
        distance: Scalars['Int'];
        description: Scalars['String'];
      };
    };
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
