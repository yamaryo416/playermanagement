import { useState, VFC } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { useRecoilValue } from "recoil"
import { useCalendar } from "../../../hooks/useCalendar"
import { scheduleOneDayState } from "../../../store/scheduleOneDayState"
import { MyAllSchedulesType, SingleTrainingType } from "../../../types/queriesType"
import { TODAY } from "../../../constants"
import moment from "moment"
import InfoIcon from '@material-ui/icons/Info';
import { useTraining } from "../../../hooks/useTraining"
import { TrainingIcon } from "../../molecules/TrainingIcon"

type Props = {
    dataAllSchedules: MyAllSchedulesType | undefined;
}

export const CalendarDetail: VFC<Props> = (props) => {
    const { dataAllSchedules } = props

    const { oneDay, scheduleContent } = useCalendar()
    const { onClickSelectedTraining } = useTraining()

    const oneDaySchedules = 
        dataAllSchedules?.myAllSchedules.edges?.
        filter(sche => sche.node.date === oneDay.toString()).
        map((sche) => (
            <Flex pb={2} alignItems="center">
                <Box>
                    <TrainingIcon iconNumber={sche.node.trainingSchedule.iconNumber} size="50px" />
                </Box>
                <Text fontSize="18px" pb={3} pr={3} textAlign="left">
                    { scheduleContent(sche) }
                </Text>
                <InfoIcon 
                    onClick={() =>
                        onClickSelectedTraining(
                            sche.node.trainingSchedule.title,
                            sche.node.trainingSchedule.count,
                            sche.node.trainingSchedule.distance,
                            sche.node.trainingSchedule.description
                )}>詳細</InfoIcon>
            </Flex>
    ))

    const oneDaySchedulesNothing = dataAllSchedules?.myAllSchedules.edges?.
        filter(sche => sche.node.date === oneDay.toString()).length === 0
            

    return (
       <Box textAlign="center">
           <Heading pb={3} fontSize="20px">
               {oneDay === TODAY ? "今日の予定" : `${moment(oneDay).format("M月D日")}の予定` }
            </Heading>
            <Box py={7}>
                {oneDaySchedulesNothing ? "予定はありません。" : oneDaySchedules}
            </Box>
       </Box>
    )
}

