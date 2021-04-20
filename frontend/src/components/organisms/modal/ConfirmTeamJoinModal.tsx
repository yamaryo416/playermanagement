import { Button } from "@chakra-ui/button";
import { Heading, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { VFC } from "react";
import { useTeam } from "../../../hooks/useTeam";
import { SecondaryButton } from "../../atoms/button/SecondaryButton";

type Props = {
    teamName: string | undefined;
    teamId: string | undefined;
}

export const ConfirmTeamJoinModal: VFC<Props> = (props) => {
    const { teamName, teamId } = props;

    const { confirmTeamJoinModal, onCloseConfrimTeamJoinModal, joinTeam } = useTeam()

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={confirmTeamJoinModal}
            onClose={onCloseConfrimTeamJoinModal}
            autoFocus={false}
            size="md"
        >
            <ModalOverlay />
            <ModalContent textAlign="center" color="black">
                <ModalHeader>チームに参加</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {teamId ? (
                        <>
                            <Heading
                                as="h3"
                                fontSize="23px"
                                textAlign="left"
                            >以下のチームに加入します。よろしいですか？</Heading>
                            <Text py={10} fontWeight="bold">チーム名: {teamName}</Text>
                            <Button bg="blue.500" px={5} color="white"  onClick={() => {
                                joinTeam(teamId!)
                                onCloseConfrimTeamJoinModal()
                            }}>加入する</Button>
                        </>
                    ):(
                        <Heading
                            as="h3"
                            fontSize="23px"
                            textAlign="left"
                            color="red.600"
                        >
                            チーム名もしくはパスワードが間違っています。
                        </Heading>
                    )}
                </ModalBody>
                <ModalFooter>
                    <SecondaryButton onClick={onCloseConfrimTeamJoinModal}>戻る</SecondaryButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}