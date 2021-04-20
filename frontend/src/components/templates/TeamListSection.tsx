import { useQuery } from "@apollo/client";
import { Box, Heading, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { VFC } from "react";
import { GET_ALL_TEAM_BOARD } from "../../queries";
import { AllTeamBoardType } from "../../types/queriesType";
import { TeamCard } from "../organisms/layout/TeamCard";

export const TeamListSection : VFC = () => {
    const { loading: loadingAllTeamBoard, data: dataAllTeamBoard } = useQuery<AllTeamBoardType>(GET_ALL_TEAM_BOARD, {
        fetchPolicy: "cache-and-network",
    })
    
    if (loadingAllTeamBoard) return <Spinner />
    return (
        <Box mt={10}>
            <Heading as="h4" fontSize="25px" mb={10}>おすすめのチーム</Heading>
            <Wrap>
                {dataAllTeamBoard?.allTeamBoard.edges?.map(({ node }) => (
                    <TeamCard
                        key={node.id}
                        teamId={node.team.id}
                        teamName={node.team.name}
                        coachName={node.coach.nickname}
                        introduction={node.introduction}
                        joinCount={node.joinCount}
                    />
                ))}
            </Wrap> 
        </Box>
    )
}