import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Flex, HStack, Link, Stack, Text, Wrap, WrapItem } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { VFC } from "react"
import { useControllModal } from "../../../hooks/useControllModal"
import { useCreateTraining } from "../../../hooks/queries/useCreateTraining"
import { useTrainingState } from "../../../hooks/useTrainingState"
import { TrainingIcon } from "../../molecules/TrainingIcon"

export const TrainingCreateModal:VFC = () => {
    const { createTraining } = useCreateTraining()
    const {
        trainingCreateModal,
        onCloseTrainingCreateModal
    } = useControllModal()
    const { 
        title,
        count,
        load,
        distance,
        iconNumber,
        description,
        isIconSelect,
        onChangeTitle,
        onChangeCount,
        onChangeLoad,
        onChangeDistance,
        onChangeDescription,
        onChangeIconNumber,
        onChangeIsIconSelect,
        resetState
    } = useTrainingState()


    const selectIcon = [...Array(4)].map((_, i) => (
        <WrapItem key={i + 1}>
            <Box textAlign="center">
                <Box>
                    <TrainingIcon iconNumber={i + 1} color="black" size="50px" />
                </Box>
                <input name="icon" type="radio" value={i + 1}  onChange={onChangeIconNumber} />
            </Box>
        </WrapItem>
    ))

    return (
        <Modal
            isOpen={trainingCreateModal}
            onClose={onCloseTrainingCreateModal}
            autoFocus={false}
        >
            <ModalOverlay/>
            <ModalContent color="black">
                <ModalHeader textAlign="center">トレーニング作成</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        createTraining(title, count, load, distance, description, iconNumber)
                        resetState()
                    }}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>トレーニング名:</FormLabel>
                                <Input value={title} onChange={onChangeTitle} />
                            </FormControl>
                            <Flex>
                                <HStack spacing={7}>
                                    <FormControl >
                                        <FormLabel>回数</FormLabel>
                                        <Flex alignItems="center">
                                            <Input type="number" value={count} onChange={onChangeCount}/>
                                            <Text>回</Text>
                                        </Flex>
                                    </FormControl>
                                    <FormControl >
                                            <FormLabel>負荷</FormLabel>
                                            <Flex alignItems="center">
                                                <Input type="number" value={load} onChange={onChangeLoad}/>
                                                <Text>kg</Text>
                                            </Flex>
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>距離</FormLabel>
                                        <Flex alignItems="center">
                                            <Input type="number" value={distance} onChange={onChangeDistance} />
                                            <Text>km</Text>
                                        </Flex>
                                    </FormControl>
                                </HStack>
                            </Flex>
                            <FormControl>
                                <FormLabel>説明</FormLabel>
                                <Input value={description} onChange={onChangeDescription} />
                            </FormControl>
                            <Link onClick={onChangeIsIconSelect}>アイコンを選択する</Link>
                            {isIconSelect ? (
                                <Wrap>
                                    {selectIcon}
                                </Wrap>
                            ) : null}
                            <Button type="submit">トレーニンングを作成する</Button>
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
