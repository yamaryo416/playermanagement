import { useMutation } from "@apollo/client"
import moment from "moment"
import { ChangeEvent, useState } from "react"
import { useRecoilState } from "recoil"
import { TODAY } from "../constants"
import { CREATE_MANY_SCHEDULES, CREATE_SINGLE_SCHEDULE, GET_MY_ALL_SCHEDULES } from "../queries"
import { scheduleCreateModalState } from "../store/scheduleCreateModalState"
import { useMessage } from "./useMessage"

export const useSchedule = () => {
    const [isCreateSingleSchedule, setIsCreateSingleSchedule] = useState(true)
    const [trainingSchedule, setTrainingSchedule] = useState("")
    const [date, setDate] = useState(TODAY)
    const [startDate, setStartDate] = useState(TODAY)
    const [endDate, setEndDate] = useState(TODAY)
    const [dayOfWeek, setDayOfWeek] = useState("0123456")
    const [scheduleCreateModal, setScheduleCreateModal] = useRecoilState(scheduleCreateModalState)

    const [createSingleScheduleMutation] = useMutation(CREATE_SINGLE_SCHEDULE,{
        refetchQueries: [{ query: GET_MY_ALL_SCHEDULES }]
    })
    const [createManySchedulesMutation] = useMutation(CREATE_MANY_SCHEDULES, {
        refetchQueries: [{ query: GET_MY_ALL_SCHEDULES }]
    })
    const { showMessage } = useMessage()

    const includeWeekDays = (i: number): boolean => dayOfWeek.includes(i.toString())

    const onClickChangeMode = () => setIsCreateSingleSchedule(!isCreateSingleSchedule)
    const onChangeTrainingSchedule = (e: ChangeEvent<HTMLSelectElement>) => setTrainingSchedule(e.target.value)
    const onChangeDate = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)
    const onChangeStartDate = (e: ChangeEvent<HTMLInputElement>) => setStartDate(e.target.value)
    const onChangeEndDate = (e: ChangeEvent<HTMLInputElement>) => setEndDate(e.target.value)
    const onChangeDayOfWeek = (e: ChangeEvent<HTMLInputElement>) => {
        const day = Number(e.target.value)
        includeWeekDays(day) ? setDayOfWeek(dayOfWeek.replace(day.toString(), "")) : setDayOfWeek(dayOfWeek + day.toString())
    }
    const onOpenScheduleCreateModal = () => setScheduleCreateModal(true)
    const onCloseScheduleCreateModal = () => setScheduleCreateModal(false)

    const createSingleSchedule = async () => {
        try {
            await createSingleScheduleMutation({
                variables: { trainingSchedule, date }
            })
            showMessage({ title: "スケジュールを作成しました。", status: "success" })
        } catch (err) {
            alert(err)
        }
    }

    const createManySchedules = async() => {
        try {
            await createManySchedulesMutation({
                variables: { trainingSchedule, startDate, endDate, dayOfWeek }
            })
            showMessage({ title: "スケジュールを作成しました。", status: "success" })
        } catch (err) {
            alert(err)
        }
    }

    return ({ 
        isCreateSingleSchedule,
        trainingSchedule,
        setTrainingSchedule,
        date,
        startDate,
        endDate,
        dayOfWeek,
        setDayOfWeek,
        scheduleCreateModal,
        includeWeekDays,
        onClickChangeMode,
        onChangeTrainingSchedule,
        onChangeDate,
        onChangeStartDate,
        onChangeEndDate,
        onChangeDayOfWeek,
        onOpenScheduleCreateModal,
        onCloseScheduleCreateModal,
        createSingleSchedule,
        createManySchedules
    })
}