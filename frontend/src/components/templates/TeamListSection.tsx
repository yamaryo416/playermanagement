import { VFC } from "react";
import { Box, Heading, Wrap } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";

import { TeamCard } from "../organisms/layout/TeamCard";
import { useGetAllTeamBoard } from "../../hooks/queries/useGetAllTeamBoard";

export const TeamListSection : VFC = () => {
    const { loadingAllTeamBoard, dataAllTeamBoard, errorAllTeamBoard } = useGetAllTeamBoard()
    
    if (loadingAllTeamBoard) return <Spinner />
    else if (errorAllTeamBoard) return(
        <Heading>Error: {errorAllTeamBoard.message}</Heading>
    )

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