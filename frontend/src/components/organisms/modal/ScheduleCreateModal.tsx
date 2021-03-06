import { useLazyQuery } from "@apollo/client"
import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Flex, Link, Stack, Text } from "@chakra-ui/layout"

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/modal"
import { Select } from "@chakra-ui/select"
import { ChangeEvent, memo, useEffect, VFC } from "react"
import { useRecoilState } from "recoil"
import { DAY_OF_WEEK } from "../../../constants"
import { useControllModal } from "../../../hooks/useControllModal"
import { useCreateManySchedules } from "../../../hooks/queries/useCreateManySchedules"
import { useCreateSingleSchedule } from "../../../hooks/queries/useCreateSingleSchedule"
import { useScheduleState } from "../../../hooks/useScheduleState"
import { GET_MY_TRAININGS } from "../../../queries"
import { scheduleCreateModalState } from "../../../store/scheduleCreateModalState"
import { MyTrainingsType } from "../../../types/queriesType"

type Props = {
    dataMyTrainings: MyTrainingsType | undefined;
}

export const ScheduleCreateModal:VFC<Props> = memo((props) => {
    const { dataMyTrainings } = props

    const { scheduleCreateModal ,onCloseScheduleCreateModal } = useControllModal()
    const { createSingleSchedule } = useCreateSingleSchedule()
    const { createManySchedules } = useCreateManySchedules()
    const { 
        isCreateSingleSchedule,
        trainingSchedule,
        date,
        startDate,
        endDate,
        dayOfWeek,
        onClickChangeMode,
        onChangeTrainingSchedule,
        onChangeDate,
        onChangeStartDate,
        onChangeEndDate,
        onChangeDayOfWeek,
        includeWeekDays,
    } = useScheduleState()

    const selectTraining = dataMyTrainings?.myTrainings.edges?.map((train) => (
        <option key={train.node.id} value={train.node.id}>
            {train.node.title}
        </option>
    ))

    const selectWeekDay = DAY_OF_WEEK.map((w, i) => (
        <Flex>
            <label>{w}</label>
            <Box pr={4}>
                <input type="checkbox" value={i} checked={includeWeekDays(i)} onChange={onChangeDayOfWeek}/>
            </Box>
        </Flex>
    ))
 
    return (
        <Modal
            isOpen={scheduleCreateModal}
            onClose={onCloseScheduleCreateModal}
            autoFocus={false}
        >
            <ModalOverlay/>
            <ModalContent color="black">
                <ModalHeader textAlign="center">????????????????????????{isCreateSingleSchedule ? "(????????????)" : "(????????????)" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        if (isCreateSingleSchedule) {
                            createSingleSchedule(trainingSchedule, date)
                        } else {
                            createManySchedules(trainingSchedule, startDate, endDate, dayOfWeek)
                        }     
                    }}>
                        <Stack spacing={4}>
                            <FormControl>
                                <FormLabel>??????????????????</FormLabel>

                            </FormControl>
                            <Select
                                value={trainingSchedule}
                                onChange={onChangeTrainingSchedule}
                            >
                                <option value="">????????????????????????????????????????????????</option>
                                {selectTraining}
                            </Select>
                            {isCreateSingleSchedule ? (
                                <FormControl>
                                    <FormLabel>??????</FormLabel>
                                    <Input type="date" value={date} onChange={onChangeDate} />
                                </FormControl>
                            ) : (
                                <> 
                                    <FormControl>
                                        <FormLabel>?????????</FormLabel>
                                        <Input type="date" value={startDate} onChange={onChangeStartDate} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>?????????</FormLabel>
                                        <Input type="date" value={endDate} onChange={onChangeEndDate} />
                                    </FormControl>

                                    <Text>????????????</Text>
                                    <Flex>
                                        {selectWeekDay}
                                    </Flex>
                                </>
                            )}
                            <Button type="submit">?????????????????????????????????</Button>
                        </Stack>
                    </form>
                </ModalBody> 
                <ModalFooter px={4} justifyContent="space-between">
                    <Link onClick={onClickChangeMode}>{isCreateSingleSchedule ? "??????????????????????????????" : "??????????????????????????????"}</Link>
                    <Button onClick={onCloseScheduleCreateModal}>?????????</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})
