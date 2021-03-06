import { useState, VFC } from "react"
import { Box, Flex } from "@chakra-ui/layout"
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import GroupIcon from '@material-ui/icons/Group';
import { SlideFade } from "@chakra-ui/transition";

import { MenuButton } from "../../molecules/MenuButton";
import { useControllModal } from "../../../hooks/useControllModal";

type Props = {
    isJoinTeam: boolean;
}

export const MainMenubar:VFC<Props> = (props) => {
    const { isJoinTeam } = props;

    const [menubarOpen, setMenubarOpen] = useState(true)

   const {
       onOpenTeamAuthModal,
       onOpenTrainingCreateModal,
       onOpenScheduleCreateModal
   } = useControllModal()

    return (
        <>
            <SlideFade in={menubarOpen} offsetX="-200px" offsetY="80px">
                <Box
                    pos="fixed"
                    top="80px"
                    h="100vh"
                    borderRightColor="gray.500"
                    borderRightStyle="solid"
                    borderRightWidth="1px"
                >
                    <Flex>
                        <Box>
                        {isJoinTeam ? (
                            <>
                                <MenuButton title="トレーニング作成" onOpen={onOpenTrainingCreateModal}>
                                    <NoteAddIcon style={{ fontSize: 60 }} />
                                </MenuButton>
                                <MenuButton title="スケジュール作成" onOpen={onOpenScheduleCreateModal}>
                                    <InsertInvitationIcon style={{ fontSize: 60}} />
                                </MenuButton>
                            </>
                        ) : (
                            <>
                                <MenuButton title="チームに参加" onOpen={onOpenTeamAuthModal}>
                                    <GroupIcon style={{ fontSize: 60 }} />
                                </MenuButton>
                            </>
                        )}
                        </Box>
                        <ArrowBackIosIcon style={{ display: "block", height: "100vh", verticalAlign: "middle" }} onClick={() => setMenubarOpen(!menubarOpen)} />
                    </Flex>
                </Box>
            </SlideFade>
            {!menubarOpen ? (
                <>
                    <Box
                        pos="fixed"
                        top="80px"
                        h="100vh"
                        borderRightColor="gray.500"
                        borderRightStyle="solid"
                        borderRightWidth="1px"
                    >
                        <NavigateNextIcon style={{ display: "block", height: "90vh", verticalAlign: "middle", fontSize: "40px" }} onClick={() => setMenubarOpen(!menubarOpen)} />
                    </Box>
                    <Box w="80px"></Box>
                </>
            ): <Box w="230px"></Box>}
        </>
    )
}

