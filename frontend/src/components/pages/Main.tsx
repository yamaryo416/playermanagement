import React, { memo, useEffect, VFC } from 'react'
import { useLazyQuery, useQuery } from '@apollo/react-hooks'
import useProfile from '../../hooks/useProfile'
import { GET_MY_PROFILE } from '../../queries'
import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { HeaderForAuthUser } from '../templates/HeaderForAuthUser'
import { useTeam } from '../../hooks/useTeam'
import { TeamAuthModal } from '../organisms/modal/TeamAuthModal'
import { TrainingCreateModal } from '../organisms/modal/TrainingCreateModal'
import { Menubar } from '../organisms/layout/Menubar'
import { ScheduleCreateModal } from '../organisms/modal/ScheduleCreateModal'
import { ScheduleDetail } from '../organisms/layout/ScheduleDetail'
import { CalendarSection } from '../templates/CalendarSection'
import { Box, Flex } from '@chakra-ui/layout'

export const Main: VFC = memo(() => {
    const { loading: loadingMyProfile, data: dataMyProfile, error: errorMyProfile } = useQuery(GET_MY_PROFILE, {
        fetchPolicy: "cache-and-network",
    })

    console.log(loadingMyProfile)
    
    if (loadingMyProfile) return <h1>loading...</h1>
    else if (errorMyProfile)
        return (
            <h1>Error: {errorMyProfile.message}</h1>
        )   
    return (
        <>
            <HeaderForAuthUser nickname={dataMyProfile?.profile.nickname} teamname={dataMyProfile?.profile.teamProf ? dataMyProfile?.profile.teamProf.name : "未所属" } />
            <Flex justify="space-between" mt={10} mx={10}>
                <Box>
                    <Menubar/>
                </Box>
                <Box w="700px" bg="white" p={10} borderRadius={30}>
                    <CalendarSection />
                </Box>
            </Flex>
            <TeamAuthModal />
            <TrainingCreateModal/>
            <ScheduleCreateModal />
        </>
    )
})
