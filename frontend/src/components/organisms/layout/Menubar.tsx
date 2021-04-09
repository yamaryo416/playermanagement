import { Box, Flex, HStack, Link, Stack } from "@chakra-ui/layout"
import { VFC } from "react"
import { useSetRecoilState } from "recoil";
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';

import { MenuButton } from "../../molecules/MenuButton";
import { trainingCreateModalState } from "../../../store/triningCreateModalState";
import { scheduleCreateModalState } from "../../../store/scheduleCreateModalState";

export const Menubar:VFC = (props) => {

    const setTrainingCreateModal = useSetRecoilState(trainingCreateModalState)
    const setScheduleCreateModal = useSetRecoilState(scheduleCreateModalState)

    const onOpenTrainingCreateModal = () => setTrainingCreateModal(true)
    const onOpenScheduleCreateModal = () => setScheduleCreateModal(true)

    return (
       <Flex justify="center" mt={5}>
           <HStack spacing="30px">
                <MenuButton title={"トレーニング作成"} onOpen={onOpenTrainingCreateModal}>
                    <DirectionsRunIcon style={{ fontSize: 60 }} />
                </MenuButton>
                <MenuButton title={"スケジュール作成"} onOpen={onOpenScheduleCreateModal}>
                    <InsertInvitationIcon style={{ fontSize: 60}} />
                </MenuButton>
                <Box>c</Box>
            </HStack>
       </Flex>
    )
}

