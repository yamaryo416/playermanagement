import { useState, useEffect, VFC, memo } from "react"
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
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { Spinner } from "@chakra-ui/spinner"
import { useQuery } from "@apollo/client"
import { GET_ONE_DAY_SCHEDULES } from "../../../queries"
import { SectionTitle } from "../../atoms/title/SectionTitle"
import { useSchedule } from "../../../hooks/useSchedule"

type Props = {
    myId: string | undefined | null;
}

export const CalendarDetail: VFC<Props> = memo((props) => {
    const { myId } = props

    const { oneDay, scheduleContent } = useCalendar()
    const { onClickSelectedTraining } = useTraining()
    const { updateSchedule } = useSchedule()

    const { loading: loadingOnedaySchedules, data: dataOneDaySchedules } = useQuery<MyAllSchedulesType>(GET_ONE_DAY_SCHEDULES, {
        fetchPolicy: "cache-and-network",
        variables: { date: oneDay },
    })

    console.log("calendar detail")

    return (
       <Box textAlign="center">
           <SectionTitle>
               {oneDay === TODAY ? "今日の予定" : `${moment(oneDay).format("M月D日")}の予定` }
            </SectionTitle>
            <Box py={7}>
                {dataOneDaySchedules?.myAllSchedules.edges?.map((sche) => (
                    <Flex pb={2} alignItems="center">
                        <Box>
                            <TrainingIcon iconNumber={sche.node.trainingSchedule.iconNumber} color="white" size="50px" />
                        </Box>
                        <Text fontSize="18px" pb={3} pr={3} textAlign="left">
                            { scheduleContent(sche) }
                        </Text>
                        <InfoIcon 
                            onClick={() =>
                                onClickSelectedTraining(
                                    sche.node.trainingSchedule.title,
                                    sche.node.trainingSchedule.count,
                                    sche.node.trainingSchedule.load,
                                    sche.node.trainingSchedule.distance,
                                    sche.node.trainingSchedule.description
                        )}>詳細</InfoIcon>
                        {sche.node.finishedMember.includes(myId!) ? 
                            <CheckBoxIcon onClick={() => {
                                updateSchedule(sche.node.id, myId!)
                            }} /> :
                            <CheckBoxOutlineBlankIcon onClick={() => {
                                updateSchedule(sche.node.id, myId!)
                            }} />}
                    </Flex>
                ))}
            </Box>
       </Box>
    )
})

