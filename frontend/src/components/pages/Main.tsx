import { memo, VFC } from 'react'
import { HeaderForAuthUser } from '../templates/HeaderForAuthUser'
import { Flex, Wrap, WrapItem } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'

import { MainMenubar } from '../organisms/main/MainMenubar'
import { MyTeamCalendarSection } from '../templates/MyTeamCalendarSection'
import { MyTeamTrainingSection } from '../templates/MyTeamTrainingSection'
import { TeamBoardSection } from '../templates/TeamBoardSection'
import { useGetMyProfile } from '../../hooks/queries/useGetMyProfile'

export const Main: VFC = memo(() => {
    const { loadingMyProfile, dataMyProfile, errorMyProfile } = useGetMyProfile()

    if (loadingMyProfile) return <Spinner />
    else if (errorMyProfile) return (
        <h1>Error: {errorMyProfile.message}</h1>
    )

    return (
        <>
            <HeaderForAuthUser nickname={dataMyProfile?.profile?.nickname} teamname={dataMyProfile?.profile.teamProf ? dataMyProfile?.profile.teamProf.name : "未所属" } />
            <Flex>
                <MainMenubar isJoinTeam={dataMyProfile?.profile.teamProf !== null} />
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
                        <MyTeamCalendarSection myId={dataMyProfile?.profile.id}/>
                    </WrapItem>
                    <WrapItem>
                        <MyTeamTrainingSection myId={dataMyProfile?.profile.id} />
                    </WrapItem>
                </Wrap>
            </Flex>
        </>
    )
})
