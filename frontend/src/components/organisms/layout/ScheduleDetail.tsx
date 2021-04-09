import { VFC } from "react"
import { Box, Heading, Text } from "@chakra-ui/layout"
import { useRecoilValue } from "recoil"
import { useCalendar } from "../../../hooks/useCalendar"
import { scheduleOneDayState } from "../../../store/scheduleOneDayState"
import { MyAllSchedulesType } from "../../../types/queriesType"
import { TODAY } from "../../../constants"
import moment from "moment"

type Props = {
    dataAllSchedules: MyAllSchedulesType | undefined;
}

export const ScheduleDetail: VFC<Props> = (props) => {
    const { dataAllSchedules } = props

    const { scheduleContent } = useCalendar()

    const oneDay = useRecoilValue(scheduleOneDayState)

    const oneDaySchedules = 
        dataAllSchedules?.myAllSchedules.edges?.
        filter(sche => sche.node.date === oneDay.toString()).
        map((sche) => (
            <>
                <Text fontSize="20px" pb={3} pl={10} textAlign="left">
                    { scheduleContent(sche) }
                </Text>
            </>
    ))

    return (
       <Box textAlign="center">
           <Heading pb={3}>
               {oneDay === TODAY ? "今日の予定" : `${moment(oneDay).format("M月D日")}の予定` }
            </Heading>
           <Box py={8} borderWidth={4} borderColor="gray.400" rounded="md" >
              {oneDaySchedules}
           </Box>
       </Box>
    )
}

