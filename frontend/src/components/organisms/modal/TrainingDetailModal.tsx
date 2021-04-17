import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { Spinner } from "@chakra-ui/spinner";
import { Dispatch, VFC } from "react";
import { useTraining } from "../../../hooks/useTraining";
import { SingleTrainingType } from "../../../types/queriesType";

export const TrainingDetailModal: VFC = () => {
    const {
        trainingSelected,
        trainingDetailModal,
        onCloseTrainingDetailModal,
    } = useTraining()

    return (
        <Modal
            isOpen={trainingDetailModal}
            onClose={onCloseTrainingDetailModal}
            autoFocus={false}
        >
            <ModalOverlay />
            <ModalContent color="black">
                <ModalCloseButton />
                <ModalBody py={10}>
                    <Stack spacing={4}>
                        <Heading fontSize="20px">{trainingSelected.title}</Heading>
                        <Heading fontSize="20px">{trainingSelected.count !== null ? `回数:　${trainingSelected.count} 回`: null}</Heading>
                        <Heading fontSize="20px">{trainingSelected.distance !== null ? `距離:　${trainingSelected.distance} km`: null}</Heading>
                        <Heading fontSize="20px">{trainingSelected.description !== "" ? `説明:　${trainingSelected.description}`: null}</Heading>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}