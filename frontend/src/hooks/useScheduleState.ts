import { ChangeEvent, useCallback, useState } from "react"

import { TODAY } from "../constants"

export const useScheduleState = () => {
    const [isCreateSingleSchedule, setIsCreateSingleSchedule] = useState(true)
    const [trainingSchedule, setTrainingSchedule] = useState("")
    const [date, setDate] = useState(TODAY)
    const [startDate, setStartDate] = useState(TODAY)
    const [endDate, setEndDate] = useState(TODAY)
    const [dayOfWeek, setDayOfWeek] = useState("0123456")

    const includeWeekDays = useCallback((i: number): boolean => dayOfWeek.includes(i.toString()), [dayOfWeek])

    const onClickChangeMode = useCallback(() => setIsCreateSingleSchedule(!isCreateSingleSchedule), [isCreateSingleSchedule])
    const onChangeTrainingSchedule = useCallback((e: ChangeEvent<HTMLSelectElement>) => setTrainingSchedule(e.target.value) ,[])
    const onChangeDate = useCallback((e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value),[])
    const onChangeStartDate = useCallback((e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value),[])
    const onChangeEndDate = useCallback((e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value),[])
    const onChangeDayOfWeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const day = Number(e.target.value)
        includeWeekDays(day) ? setDayOfWeek(dayOfWeek.replace(day.toString(), "")) : setDayOfWeek(dayOfWeek + day.toString())
    }, [dayOfWeek])

    return ({ 
        isCreateSingleSchedule,
        trainingSchedule,
        setTrainingSchedule,
        date,
        startDate,
        endDate,
        dayOfWeek,
        setDayOfWeek,
        includeWeekDays,
        onClickChangeMode,
        onChangeTrainingSchedule,
        onChangeDate,
        onChangeStartDate,
        onChangeEndDate,
        onChangeDayOfWeek,
    })
}