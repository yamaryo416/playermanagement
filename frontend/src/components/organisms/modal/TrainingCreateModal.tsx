import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Flex, HStack, Stack } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { ChangeEvent, VFC } from "react"
import { useRecoilState } from "recoil"
import { useTraining } from "../../../hooks/useTraining"
import { trainingCreateModalState } from "../../../store/triningCreateModalState"

export const TrainingCreateModal:VFC = () => {
    const [trainingCreateModal, setTrainingCreateModal] = useRecoilState(trainingCreateModalState)

    const { title, count, distance, description, onChangeTitle, onChangeCount, onChangeDistance, onChangeDescription, createTraining } = useTraining()

    const onCloseTrainingCreateModal = () => setTrainingCreateModal(false)

    return (
        <Modal
            isOpen={trainingCreateModal}
            onClose={onCloseTrainingCreateModal}
            autoFocus={false}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader textAlign="center">トレーニング作成</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        createTraining()
                    }}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>トレーニング名:</FormLabel>
                                <Input value={title} onChange={onChangeTitle} />
                            </FormControl>
                            <Flex>
                                <HStack spacing={7}>
                                    <FormControl >
                                        <FormLabel>回数:</FormLabel>
                                        <Input type="number" value={count} onChange={onChangeCount}/>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>距離:</FormLabel>
                                        <Input type="number" value={distance} onChange={onChangeDistance} />
                                    </FormControl>
                                </HStack>
                            </Flex>
                            <FormControl>
                                <FormLabel>説明:</FormLabel>
                                <Input value={description} onChange={onChangeDescription} />
                            </FormControl>
                            <Button type="submit">レーニンングを作成する</Button>
                        </Stack>
                    </form>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onCloseTrainingCreateModal}>閉じる</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}
