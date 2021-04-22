import { Box, Heading, Stack, Text } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import { useCallback, VFC } from "react";
import { useRecoilState } from "recoil";
import { trainingSelectedState } from "../../../store/trainingSelectedState";
import { SingleTrainingType } from "../../../types/queriesType";

export const TrainingDetailModal: VFC = () => {

    const [trainingSelected, setTrainningSelected] = useRecoilState(trainingSelectedState)

    const onCloseTrainingDetailModal = useCallback(() => setTrainningSelected({
        title: "",
        count: null,
        load: null,
        distance: null,
        description: "",
        isModalOpen: false,
    }), [trainingSelected])

    return (
        <Modal
            isOpen={trainingSelected.isModalOpen}
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
                        <Heading fontSize="20px">{trainingSelected.load !== null ? `負荷:　${trainingSelected.load} kg`: null}</Heading>
                        <Heading fontSize="20px">{trainingSelected.distance !== null ? `距離:　${trainingSelected.distance} km`: null}</Heading>
                        <Heading fontSize="20px">{trainingSelected.description !== "" ? `説明:　${trainingSelected.description}`: null}</Heading>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}