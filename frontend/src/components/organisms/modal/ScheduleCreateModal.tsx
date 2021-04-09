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
import { useSchedule } from "../../../hooks/useSchedule"
import { GET_MY_TRAININGS } from "../../../queries"
import { scheduleCreateModalState } from "../../../store/scheduleCreateModalState"
import { MyTrainingsType } from "../../../types/queriesType"

export const ScheduleCreateModal:VFC = memo(() => {
    const { isCreateSingleSchedule,
            trainingSchedule,
            setTrainingSchedule,
            date,
            startDate,
            endDate,
            onClickChangeMode,
            onChangeTrainingSchedule,
            onChangeDate,
            onChangeStartDate,
            onChangeEndDate,
            onChangeDayOfWeek,
            includeWeekDays,
            createSingleSchedule,
            createManySchedules
         } = useSchedule()

    const [scheduleCreateModal, setScheduleCreateModal] = useRecoilState(scheduleCreateModalState)

    const [getMyTrainingsQuery, { loading: loadingMyTrainings, data: dataMyTrainings, error: errorMyTrainings }] = useLazyQuery<MyTrainingsType>(GET_MY_TRAININGS, {
        fetchPolicy: "cache-and-network",
    })

    const onCloseScheduleCreateModal = () => setScheduleCreateModal(false)

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

    useEffect(() => {
        const getMyTrainings = async () => {
            await getMyTrainingsQuery()
        }
        getMyTrainings()
    
    }, [scheduleCreateModal])
 
    return (
        <Modal
            isOpen={scheduleCreateModal}
            onClose={onCloseScheduleCreateModal}
            autoFocus={false}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader textAlign="center">スケジュール作成{isCreateSingleSchedule ? "(一日のみ)" : "(期間指定)" }</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {loadingMyTrainings ? (
                        <Text>Loading...</Text>
                    ) : (
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            if (isCreateSingleSchedule) {
                                createSingleSchedule()
                            } else {
                                createManySchedules()
                            }     
                        }}>
                            <Stack spacing={4}>
                                <FormControl>
                                    <FormLabel>トレーニング</FormLabel>

                                </FormControl>
                                <Select
                                    value={trainingSchedule}
                                    onChange={onChangeTrainingSchedule}
                                >
                                    <option value="">トレーニングを選択してください。</option>
                                    {selectTraining}
                                </Select>
                                {isCreateSingleSchedule ? (
                                    <FormControl>
                                        <FormLabel>日付</FormLabel>
                                        <Input type="date" value={date} onChange={onChangeDate} />
                                    </FormControl>
                                ) : (
                                    <> 
                                        <FormControl>
                                            <FormLabel>開始日</FormLabel>
                                            <Input type="date" value={startDate} onChange={onChangeStartDate} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>終了日</FormLabel>
                                            <Input type="date" value={endDate} onChange={onChangeEndDate} />
                                        </FormControl>

                                        <Text>曜日指定</Text>
                                        <Flex>
                                            {selectWeekDay}
                                        </Flex>
                                    </>
                                )}
                                <Button type="submit">スケジュールを作成する</Button>
                            </Stack>
                        </form>
                    )}
                </ModalBody> 
                <ModalFooter px={4} justifyContent="space-between">
                    <Link onClick={onClickChangeMode}>{isCreateSingleSchedule ? "期間指定に切り替える" : "一日のみに切り替える"}</Link>
                    <Button onClick={onCloseScheduleCreateModal}>閉じる</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})
