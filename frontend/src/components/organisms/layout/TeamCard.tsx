import { Box, Text, WrapItem } from "@chakra-ui/layout"
import { ReactNode, VFC } from "react"
import { useHistory } from "react-router-dom"
import { useTeam } from "../../../hooks/useTeam"

type Props = {
    key: string;
    teamId: string;
    teamName: string;
    coachName: string;
    introduction: string;
    joinCount: number;
}

export const TeamCard: VFC<Props> = (props) => {
    const history = useHistory()
    const { key, teamId, teamName, coachName, introduction, joinCount } = props;

    const { onChangeTeamDetail, getOneTeamFromIdQuery } = useTeam()

    return (
        <WrapItem
            key={key}
            w="500px"
            p={5}
            borderColor="gray.600"
            bg="rgb(2, 2, 2)"
            borderStyle="solid"
            borderWidth="1px"
            display="block"
            onClick={async () => {
                history.push(`/team/${teamId}`)
        }}>
            <Text fontSize="20px" textAlign="center" pb={5}>{teamName}</Text>
            <Text pb={5}>コーチ: {coachName}</Text>
            <Text pb={5}>チーム人数: {joinCount}人</Text>
            <Text>紹介文</Text>
            <Text>{introduction ? introduction : "記載なし"}</Text>
        </WrapItem>
    )
}