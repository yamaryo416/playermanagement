import { memo, VFC } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { GET_MY_PROFILE, GET_MY_TRAININGS } from '../../queries'
import { HeaderForAuthUser } from '../templates/HeaderForAuthUser'
import { TeamAuthModal } from '../organisms/modal/TeamAuthModal'
import { TrainingCreateModal } from '../organisms/modal/TrainingCreateModal'
import { MainMenubar } from '../organisms/main/MainMenubar'
import { ScheduleCreateModal } from '../organisms/modal/ScheduleCreateModal'
import { CalendarSection } from '../templates/CalendarSection'
import { Box, Flex, HStack, Wrap, WrapItem } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { TrainingSection } from '../templates/TrainingSection'
import { MyProfileType, MyTrainingsType } from '../../types/queriesType'
import { useTraining } from '../../hooks/useTraining'
import { TrainingDetailModal } from '../organisms/modal/TrainingDetailModal'
import { TeamBoardSection } from '../templates/TeamBoardSection'

export const Main: VFC = memo(() => {
    const { loading: loadingMyProfile, data: dataMyProfile, error: errorMyProfile } = useQuery<MyProfileType>(GET_MY_PROFILE, {
        fetchPolicy: "cache-and-network",
    })

    if (loadingMyProfile) return <Spinner />
    else if (errorMyProfile) return (
        <h1>Error: {errorMyProfile.message}</h1>
    )
    return (
        <>
            <HeaderForAuthUser nickname={dataMyProfile?.profile.nickname} teamname={dataMyProfile?.profile.teamProf ? dataMyProfile?.profile.teamProf.name : "未所属" } />
            <Flex>
                <MainMenubar />
                <Wrap mt="100px" spacing={10}>
                    <WrapItem>
                        <TeamBoardSection
                            myId={dataMyProfile?.profile.id}
                            teamName={dataMyProfile?.profile.teamProf?.name}
                            introduction={dataMyProfile?.profile.teamProf?.teamBoard?.introduction}
                            coachName={dataMyProfile?.profile.teamProf?.teamBoard?.coach.nickname}
                            isCoach={dataMyProfile?.profile.isCoach}
                        />
                    </WrapItem>
                    <WrapItem>
                        <CalendarSection />
                    </WrapItem>
                    <WrapItem>
                        <TrainingSection userId={dataMyProfile?.profile.id} />
                    </WrapItem>
                </Wrap>
            </Flex>
            <TeamAuthModal />
            <TrainingDetailModal />
        </>
    )
})
