import { useQuery } from "@apollo/client"
import { memo, VFC } from "react"
import { GET_MY_ALL_SCHEDULES } from "../../queries"
import { MyAllSchedulesType } from "../../types/queriesType"
import { Calendar } from "../organisms/calendar/Calendar"
import { CalendarMenubar } from "../organisms/calendar/CalendarMenubar"
import { CalendarDetail } from "../organisms/calendar/CalendarDetail"
import { Spinner } from "@chakra-ui/spinner"
import { Box } from "@chakra-ui/layout"
import { SectionCard } from "../organisms/layout/SectionCard"

type Props = {
    myId: string | undefined;
}

export const MyTeamCalendarSection: VFC<Props> = memo((props) => {
    const { myId } = props;
    const {
        loading: loadingAllSchedules,
        data: dataAllSchedules,
        error: errorAllSchedules
    }  = useQuery<MyAllSchedulesType>(GET_MY_ALL_SCHEDULES, {
        fetchPolicy: "cache-and-network",
    })
    console.log("calendar")

    if (loadingAllSchedules) return (
        <Box textAlign="center">
            <Spinner/>
        </Box>
    )
    else if (errorAllSchedules) return <h1>error: {errorAllSchedules.message}</h1>
    return (
        <SectionCard>
            <CalendarDetail myId={myId} />
            <CalendarMenubar />
            <Calendar schedules={dataAllSchedules?.myAllSchedules} />
        </SectionCard>
    )
})
