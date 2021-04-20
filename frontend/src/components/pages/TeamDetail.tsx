import { useQuery } from "@apollo/client";
import { Box, Flex, Wrap, WrapItem } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { VFC } from "react";
import { useParams } from "react-router-dom";
import { GET_MY_PROFILE, GET_ONE_TEAM_FROM_ID } from "../../queries";
import { MyProfileType, OneTeamFromIdType } from "../../types/queriesType";
import { MainMenubar } from "../organisms/main/MainMenubar";
import { ConfirmTeamJoinModal } from "../organisms/modal/ConfirmTeamJoinModal";
import { TeamAuthModal } from "../organisms/modal/TeamAuthModal";
import { TeamDetailMenubar } from "../organisms/team/TeamDetailMenubar";
import { HeaderForAuthUser } from "../templates/HeaderForAuthUser";
import { OneTeamCalendarSection } from "../templates/OneTeamCalendarSection";
import { OneTeamTrainingSection } from "../templates/OneTeamTrainingSection";
import { TeamBoardSection } from "../templates/TeamBoardSection";

type ParameterType = {
    id: string;
}

export const TeamDetail: VFC = () => {
    const { id } = useParams<ParameterType>();

    const { loading: loadingMyProfile, data: dataMyProfile } = useQuery<MyProfileType>(GET_MY_PROFILE, {
        fetchPolicy: "cache-and-network",
    })
    const {loading: loadingOneTeamFromId, data: dataOneTeamFromId } = useQuery<OneTeamFromIdType>(GET_ONE_TEAM_FROM_ID, {
        variables: { id }
    })

    if (loadingMyProfile || loadingOneTeamFromId) return <Spinner />

    return (
        <>
            <HeaderForAuthUser nickname={dataMyProfile?.profile.nickname} teamname={dataMyProfile?.profile.teamProf ? dataMyProfile?.profile.teamProf.name : "未所属" } />
            <Flex>
                <MainMenubar joinTeam={dataMyProfile?.profile.teamProf !== null} />
                <Box mt="100px" color="white" w="90%" mr={10}>
                   <TeamDetailMenubar teamName={dataOneTeamFromId?.teamFromId.name} />
                    <Wrap spacing={5} justifyContent="center">
                        <WrapItem>
                            <TeamBoardSection
                                myId={false}
                                teamName={dataOneTeamFromId?.teamFromId.name}
                                introduction={dataOneTeamFromId?.teamFromId.teamBoard.introduction}
                                coachName={dataOneTeamFromId?.teamFromId.teamBoard.coach.nickname}
                                isCoach={false}
                            />
                        </WrapItem>
                        <WrapItem>
                            <OneTeamCalendarSection schedules={dataOneTeamFromId?.teamFromId.schedules} />
                        </WrapItem>
                        <WrapItem>
                            <OneTeamTrainingSection trainings={dataOneTeamFromId?.teamFromId.trainings} />
                        </WrapItem>
                    </Wrap>
                </Box>
            </Flex>
            <ConfirmTeamJoinModal teamName={dataOneTeamFromId?.teamFromId.name} teamId={dataOneTeamFromId?.teamFromId.id} /> 
            <TeamAuthModal />
        </>
    )
}