import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Img } from "@chakra-ui/image"
import { Input } from "@chakra-ui/input"
import { Box, Flex, HStack, Link, Stack, Text, Wrap, WrapItem } from "@chakra-ui/layout"
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { Select } from "@chakra-ui/select"
import { useState, VFC } from "react"
import { useTraining } from "../../../hooks/useTraining"
import { BlackBarbellIcon } from "../../atoms/image/BlackBarbellIcon"
import { BlackBarbellSquatIcon } from "../../atoms/image/BlackBarbellSquatIcon"
import { BlackRunningIcon } from "../../atoms/image/BlackRunningIcon"
import { BlackSquatIcon } from "../../atoms/image/BlackSquatIcon"

export const TrainingCreateModal:VFC = () => {
    const { 
        title,
        count,
        distance,
        iconNumber,
        description,
        trainingCreateModal,
        onChangeTitle,
        onChangeCount,
        onChangeDistance,
        onChangeDescription,
        onChangeIconNumber,
        onCloseTrainingCreateModal,
        createTraining
    } = useTraining()

    const [isIconSelect, setIsIconSelect] = useState(false)

    const onChangeIsIconSelect = () => setIsIconSelect(!isIconSelect)

    const icons = [
        <BlackBarbellIcon />,
        <BlackBarbellSquatIcon />,
        <BlackRunningIcon />,
        <BlackSquatIcon />
    ]

    const selectIcon =  icons.map((icon, i) => (
        <WrapItem>
            <Box textAlign="center">
                <Box>
                    {icon}
                </Box>
                <input name="icon" type="radio" key={i} value={i + 1}  onChange={onChangeIconNumber} />
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
                            <Link onClick={onChangeIsIconSelect}>アイコンを選択する</Link>
                            {isIconSelect ? (
                                <Wrap>
                                    {selectIcon}
                                </Wrap>
                            ) : null}
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
