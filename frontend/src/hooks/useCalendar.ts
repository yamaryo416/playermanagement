import { useCallback } from "react";
import moment from "moment";
import { useRecoilState } from "recoil";

import { ScheduleType } from "../types/queriesType";
import { calendarDateState } from "../store/calendarDateState";
import { FIRSTDATE } from "../constants";

export const useCalendar = () => {
    const [calendarDate, setCalendarDate] = useRecoilState(calendarDateState)

    const scheduleContent = useCallback((sche: ScheduleType) => {
        let scheduleContent = sche.node.trainingSchedule.title
        if (sche.node.trainingSchedule.count !== null) {
            scheduleContent  +=`/ ${sche.node.trainingSchedule.count}回`
        }
        if (sche.node.trainingSchedule.load !== null) {
            scheduleContent += `/ ${sche.node.trainingSchedule.load}kg`
        }
        if (sche.node.trainingSchedule.distance !== null) {
            scheduleContent += `/ ${sche.node.trainingSchedule.distance}km`
        }
        return scheduleContent
    }, [])
        
    const onClickLastWeek = useCallback(() => {
        setCalendarDate({
            ...calendarDate, 
            firstDate: moment(calendarDate.firstDate).add(-1, "w"),
            todayDiff: calendarDate.todayDiff - 1
        })
    }, [calendarDate])
    const onClickThisWeek = useCallback(() => {
        setCalendarDate({
            ...calendarDate, 
            firstDate: FIRSTDATE,
            todayDiff: 0
        })
    }, [calendarDate])
    const onClickNextWeek = useCallback(() => {
        setCalendarDate({
            ...calendarDate, 
            firstDate: moment(calendarDate.firstDate).add(1, "w"),
            todayDiff: calendarDate.todayDiff + 1
        })
    }, [calendarDate])

    return ({
        scheduleContent,
        onClickLastWeek,
        onClickThisWeek,
        onClickNextWeek,
    })
}