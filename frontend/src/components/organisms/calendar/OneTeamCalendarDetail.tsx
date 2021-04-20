import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import moment from "moment";
import { VFC } from "react";
import { TODAY } from "../../../constants";
import { useCalendar } from "../../../hooks/useCalendar";
import { ScheduleType } from "../../../types/queriesType";
import { TrainingIcon } from "../../molecules/TrainingIcon";

type Maybe<T> = T | null;

type Props = {
    schedules: {
        edges: Maybe<ScheduleType[]>
    } | undefined;
}

export const OneTeamCalendarDetail: VFC<Props> = (props) => {
    const { schedules } = props

    const { oneDay, scheduleContent } = useCalendar()
    
    
    return (
        <Box textAlign="center">
        <Heading pb={3} fontSize="20px" color="rgb(66, 203, 237)">
            {oneDay === TODAY ? "今日の予定" : `${moment(oneDay).format("M月D日")}の予定` }
         </Heading>
         <Box py={7}>
             {schedules?.edges?.filter(sche => sche.node.date === oneDay).map((sche) => (
                 <Flex pb={2} alignItems="center">
                     <Box>
                         <TrainingIcon iconNumber={sche.node.trainingSchedule.iconNumber} color="white" size="50px" />
                     </Box>
                     <Text fontSize="18px" pb={3} pr={3} textAlign="left">
                         { scheduleContent(sche) }
                     </Text>
                 </Flex>
             ))}
         </Box>
    </Box>
    )
}