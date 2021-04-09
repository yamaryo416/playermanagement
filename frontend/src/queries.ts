import gql from 'graphql-tag';

export const CREATE_USER = gql`
    mutation($email: String!, $password: String!) {
        createUser(input: {email: $email, password: $password}){
            user {
                id
                email
            }
         }
    }
`;

export const GET_TOKEN = gql`
    mutation($email: String!, $password: String!) {
        tokenAuth(email: $email, password: $password) {
            token
        }
    }
`;

export const GET_MY_TRAININGS = gql`
    query {
        myTrainings {
            edges {
                node {
                    id
                    title
                }
            }
        }
    }
`;

export const GET_MY_WEEK_SCHEDULES = gql`
    query($firstDate: Date!) {
        myWeekSchedules(firstDate: $firstDate) {
            edges {
                node {
                    trainingSchedule {
                        title
                    }
                    date
                }
            }
        }
    }
`;

export const GET_ONE_DAY_SCHEDULES = gql`
    query($date : Date!) {
        myAllSchedules(date: $date) {
            edges {
                node {
                    trainingSchedule {
                        title
                        count
                        distance
                        description
                    }
                    date
                }
            }
        }
    }
`;

export const GET_MY_ALL_SCHEDULES = gql`
    query {
        myAllSchedules {
            edges {
                node {
                    trainingSchedule {
                        title
                        count
                        distance
                        description
                    }
                    date
                }
            }
        }
    }
`;

export const CREATE_PROFILE = gql`
    mutation($nickname: String!) {
        createProfile(input: {nickname: $nickname}) {
            profile {
                id
                nickname
            }
        }
    }
`;

export const CREATE_TEAM = gql`
    mutation($name: String!, $password: String!) {
        createTeam(input: {name: $name, password: $password}) {
            team {
                id
            }
        }
    }
`;

export const GET_MY_PROFILE = gql`
    query {
        profile {
            id
            nickname
            userProf {
                id
            }
            teamProf {
                name
            }
            isCoach
        }
    }
`;

export const GET_ONE_TEAM = gql`
    query($name: String!, $password: String!) {
        team(name: $name, password: $password) {
            id
            name
        }
    }
`;

export const UPDATE_MY_PROFILE_TEAM  = gql`
    mutation($teamProf: ID!, $isCoach: Boolean!) {
        updateProfile(input: { teamProf: $teamProf, isCoach: $isCoach }) {
            profile {
                nickname
            }
        }
    }
`;

export const CREATE_TRAINING = gql`
    mutation(
        $title: String!, 
        $count: Int!,
        $distance: Int!,
        $description: String!
    ){
        createTraining(input: { 
                            title: $title,
                            count: $count,
                            distance: $distance,
                            description: $description 
                        }) {
            training {
                title 
                teamTraining {
                    name
                }
            }
        }
    }
`;

export const CREATE_SINGLE_SCHEDULE = gql`
    mutation($trainingSchedule: ID!, $date: Date!) {
        createSchedule(input: { trainingSchedule: $trainingSchedule, date: $date}) {
            schedule {
                trainingSchedule {
                    title
                }
                teamSchedule {
                    name
                }
            }
        }
    }
`

export const CREATE_MANY_SCHEDULES = gql`
    mutation(
        $trainingSchedule: ID!,
        $startDate: Date!,
        $endDate: Date!,
        $dayOfWeek: String!
         ) {
        createManySchedules(input: { 
                                trainingSchedule: $trainingSchedule,
                                startDate: $startDate,
                                endDate: $endDate,
                                dayOfWeek: $dayOfWeek
            }) {
            schedule {
                trainingSchedule {
                    title
                }
                teamSchedule {
                    name
                }
            }
        }
    }
`;