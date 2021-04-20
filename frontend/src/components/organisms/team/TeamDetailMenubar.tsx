import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { VFC } from "react";
import { useHistory } from "react-router-dom";
import { useTeam } from "../../../hooks/useTeam";

type Props = {
    teamName: string | undefined;
}

export const TeamDetailMenubar: VFC<Props> = (props) => {
    const { teamName } = props;

    const history = useHistory()
    
    const { onOpenConfrimTeamJoinModal } = useTeam()
    
    return (
        <Flex justifyContent="space-between" mb={10}>
            <Box>
                <Link onClick={() => history.push("/team")} color="orange.500">チーム一覧に戻る</Link>
            </Box>
            <Heading fontSize="30px">{teamName}のページ</Heading>
            <Box>
                <Button bg="rgb(255, 255, 0)" color="black" onClick={onOpenConfrimTeamJoinModal}>チームに加入する</Button>
            </Box>
        </Flex>
    )
}