import moment from "moment";
import { useState, VFC } from "react";
import { useRecoilState } from "recoil";
import { scheduleFirstDateState } from "../store/scheduleFirstDateState";
import { scheduleOneDayState } from "../store/scheduleOneDayState";
import { scheduleTodayDiffState } from "../store/scheduleTodayDiffState";
import { ScheduleType } from "../types/queriesType";


export const useCalendar = () => {
    const [firstDate, setFirstDate] = useRecoilState(scheduleFirstDateState)
    const [oneDay, setOneDay] = useRecoilState(scheduleOneDayState)
    const [todayDiff, setTodayDiff] = useRecoilState(scheduleTodayDiffState)

    const scheduleContent = (sche: ScheduleType) => {
        let scheduleContent = sche.node.trainingSchedule.title
        if (sche.node.trainingSchedule.count !== null) {
            scheduleContent  +=`/ ${sche.node.trainingSchedule.count}回`
        }
        if (sche.node.trainingSchedule.distance !== null) {
            scheduleContent += `/ ${sche.node.trainingSchedule.distance}km`
        }
        return scheduleContent
    }
        
    const onClickLastWeek = () => {
        setFirstDate(moment(firstDate).add(-1, "w"))
        setTodayDiff(todayDiff - 1)
    }
    const onClickThisWeek = () => {
        setFirstDate(moment().startOf("week"))
        setTodayDiff(0)
    }
    const onClickNextWeek = () => {
        setFirstDate(moment(firstDate).add(1, "w"))
        setTodayDiff(todayDiff + 1)
    }
    const onChangeOneDaySchedules = (d: moment.Moment) => {
        setOneDay(d.format("YYYY-MM-DD"))
    }

    return ({
        firstDate,
        oneDay,
        todayDiff,
        scheduleContent,
        onClickLastWeek,
        onClickThisWeek,
        onClickNextWeek,
        onChangeOneDaySchedules,
    })
}