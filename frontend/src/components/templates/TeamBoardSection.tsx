import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout"
import { VFC } from "react"
import { useTeam } from "../../hooks/useTeam"
import { SectionTitle } from "../atoms/title/SectionTitle"

import { SectionCard } from "../organisms/layout/SectionCard"
import { TeamBoardPost } from "../organisms/team/TeamBoardPost"

type Props = {
    myId: string | false | undefined;
    teamName: string | undefined;
    introduction: string | undefined;
    coachName: String | undefined;
    isCoach: boolean | undefined;
}

export const TeamBoardSection: VFC<Props> = (props) => {
    const { myId, teamName, introduction, coachName, isCoach } = props;

    const { text, onChangeText, createPost } = useTeam();

    return (
        <SectionCard>
            <SectionTitle >{teamName ? teamName : null}の掲示板</SectionTitle>
            <Box pb={10}>
                <Text pb={10}>
                    コーチ: {coachName}
                </Text>
                <Text>
                    {introduction ?? "記載はありません。"}
                </Text>
            </Box>
            {myId ? <TeamBoardPost myId={myId} /> : null }
        </SectionCard>
    )
}

