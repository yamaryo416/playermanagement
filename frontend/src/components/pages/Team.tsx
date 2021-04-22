import { memo, VFC } from "react";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

import { MainMenubar } from "../organisms/main/MainMenubar";
import { TeamAuthModal } from "../organisms/modal/TeamAuthModal";
import { HeaderForAuthUser } from "../templates/HeaderForAuthUser";
import { TeamListSection } from "../templates/TeamListSection";
import { useGetMyProfile } from "../../hooks/queries/useGetMyProfile";

export const Team: VFC = memo(() => {
    const { loadingMyProfile, errorMyProfile, dataMyProfile } = useGetMyProfile()

    if (loadingMyProfile) return <Spinner />
    else if (errorMyProfile) return (
        <h1>Error: {errorMyProfile.message}</h1>
    )
    
    return (
        <>
            <HeaderForAuthUser nickname={dataMyProfile?.profile.nickname} teamname={dataMyProfile?.profile.teamProf ? dataMyProfile?.profile.teamProf.name : "未所属" } />
            <Flex>
                <MainMenubar isJoinTeam={dataMyProfile?.profile.teamProf !== null} />
                <Box mt="100px" ml="100px" color="white">
                    <Heading fontSize="25px">まだチームに加入していません。</Heading>
                    <TeamListSection />
                    <TeamAuthModal />
                </Box>
            </Flex>
        </>
    )
})