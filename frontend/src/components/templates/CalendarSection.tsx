
import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, VFC } from "react"
import { useCalendar } from "../../hooks/useCalendar"
import { GET_MY_ALL_SCHEDULES, GET_ONE_DAY_SCHEDULES } from "../../queries"
import { MyAllSchedulesType } from "../../types/queriesType"
import { Calendar } from "../organisms/layout/Calendar"
import { ScheduleDetail } from "../organisms/layout/ScheduleDetail"

export const CalendarSection: VFC = () => {
    
    const {
        loading: loadingAllSchedules,
        data: dataAllSchedules,
        error: errorAllSchedules
    }  = useQuery<MyAllSchedulesType>(GET_MY_ALL_SCHEDULES, {
        fetchPolicy: "cache-and-network",
    })

    if (loadingAllSchedules) return <h1>Loading...</h1>
    else if (errorAllSchedules) return <h1>error: {errorAllSchedules.message}</h1>
    return (
        <>
            <ScheduleDetail dataAllSchedules={dataAllSchedules} />
            <Calendar dataAllSchedules={dataAllSchedules} />
        </>
    )
}
