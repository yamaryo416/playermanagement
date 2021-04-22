import { VFC, memo } from "react"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { Spinner } from "@chakra-ui/spinner"
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import moment from "moment"
import InfoIcon from '@material-ui/icons/Info';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

import { useCalendar } from "../../../hooks/useCalendar"
import { scheduleOneDayState } from "../../../store/scheduleOneDayState"
import { TODAY } from "../../../constants"
import { TrainingIcon } from "../../molecules/TrainingIcon"
import { SectionTitle } from "../../atoms/title/SectionTitle"
import { trainingSelectedState } from "../../../store/trainingSelectedState"
import { useUpdateScheduleFinishMember } from "../../../hooks/queries/useUpdateScheduleFinishMember"
import { useGetOneDaySchedules } from "../../../hooks/queries/useGetOneDaySchedules"

type Props = {
    myId: string | undefined | null;
}

export const MyTeamCalendarDetail: VFC<Props> = memo((props) => {
    const { myId } = props

    const { scheduleContent } = useCalendar()
    const { updateScheduleFinishMember } = useUpdateScheduleFinishMember()
    const { loadingOnedaySchedules, dataOneDaySchedules, errorOneDaySchedules } = useGetOneDaySchedules()

    const oneDay = useRecoilValue(scheduleOneDayState)
    const setTrainingSelected = useSetRecoilState(trainingSelectedState)

    if (loadingOnedaySchedules) return <Spinner /> 
    else if (errorOneDaySchedules) return (
        <Heading>Error: {errorOneDaySchedules.message}</Heading>
    )

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
                                setTrainingSelected({
                                    title: sche.node.trainingSchedule.title,
                                    count:  sche.node.trainingSchedule.count,
                                    load: sche.node.trainingSchedule.load,
                                    distance: sche.node.trainingSchedule.distance,
                                    description: sche.node.trainingSchedule.description,
                                    isModalOpen: true
                        })}>詳細</InfoIcon>
                        {sche.node.finishedMember.includes(myId!) ? 
                            <CheckBoxIcon onClick={() => {
                                updateScheduleFinishMember(sche.node.id, myId!)
                            }} /> :
                            <CheckBoxOutlineBlankIcon onClick={() => {
                                updateScheduleFinishMember(sche.node.id, myId!)
                            }} />}
                    </Flex>
                ))}
            </Box>
       </Box>
    )
})

