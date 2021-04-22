import { useMutation } from "@apollo/client"
import { useCallback } from "react"
import { CREATE_SINGLE_SCHEDULE, GET_MY_ALL_SCHEDULES } from "../../queries"
import { useMessage } from "../useMessage"

export const useCreateSingleSchedule = () => {
    const { showMessage } = useMessage()
    
    const [createSingleScheduleMutation] = useMutation(CREATE_SINGLE_SCHEDULE,{
        refetchQueries: [{ query: GET_MY_ALL_SCHEDULES }]
    })

    const createSingleSchedule =  useCallback(async (trainingSchedule: string, date: string) => {
        try {
            await createSingleScheduleMutation({
                variables: { trainingSchedule, date }
            })
            showMessage({ title: "スケジュールを作成しました。", status: "success" })
        } catch (err) {
            alert(err)
        }
    }, [])

    return { createSingleSchedule }
}