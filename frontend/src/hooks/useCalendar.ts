import moment from "moment";
import { useState, VFC } from "react";
import { ScheduleType } from "../types/queriesType";


export const useCalendar = () => {
    const [firstDate, setFirstDate] = useState(moment().startOf("week").format("YYYY-MM-DD"))

    const datesOfWeek: moment.Moment[] = []
    let addDate = 0;
    while (addDate < 7) {
        const date = moment(firstDate).add(addDate, 'd')
        datesOfWeek.push(date)
        addDate++
    }

    const scheduleContent = (sche: ScheduleType) => {
        let scheduleContent = sche.node.trainingSchedule.title
        if (sche.node.trainingSchedule.count !== null) {
            scheduleContent  +=`  ${sche.node.trainingSchedule.count}回`
        }
        if (sche.node.trainingSchedule.distance !== null) {
            scheduleContent += `  ${sche.node.trainingSchedule.distance}km`
        }
        return scheduleContent
    }
        
    const onClickLastWeek = () => setFirstDate(moment(firstDate).add(-1, "w").format("YYYY-MM-DD"))
    const onClickThisWeek = () => setFirstDate(moment().startOf("week").format("YYYY-MM-DD"))
    const onClickNextWeek = () => setFirstDate(moment(firstDate).add(1, "w").format("YYYY-MM-DD"))

    return ({
        datesOfWeek,
        scheduleContent,
        onClickLastWeek,
        onClickThisWeek,
        onClickNextWeek,
    })
}