import { memo, VFC } from "react"
import { Box } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"

import { Calendar } from "../organisms/calendar/Calendar"
import { CalendarMenubar } from "../organisms/calendar/CalendarMenubar"
import { MyTeamCalendarDetail } from "../organisms/calendar/MyTeamCalendarDetail"
import { SectionCard } from "../organisms/layout/SectionCard"
import { useGetAllSchedules } from "../../hooks/queries/useGetAllSchedules"

type Props = {
    myId: string | undefined;
}

export const MyTeamCalendarSection: VFC<Props> = memo((props) => {
    const { myId } = props;
    const { loadingAllSchedules, dataAllSchedules, errorAllSchedules } = useGetAllSchedules()

    if (loadingAllSchedules) return (
        <Box textAlign="center">
            <Spinner/>
        </Box>
    )
    else if (errorAllSchedules) return <h1>error: {errorAllSchedules.message}</h1>
    
    return (
        <SectionCard>
            <MyTeamCalendarDetail myId={myId} />
            <CalendarMenubar />
            <Calendar schedules={dataAllSchedules?.myAllSchedules} />
        </SectionCard>
    )
})
