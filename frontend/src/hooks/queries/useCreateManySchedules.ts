import { useMutation } from "@apollo/client"
import { CREATE_MANY_SCHEDULES, GET_MY_ALL_SCHEDULES } from "../../queries"
import { useMessage } from "../useMessage"

export const useCreateManySchedules = () => {
    const { showMessage } = useMessage()

    const [createManySchedulesMutation] = useMutation(CREATE_MANY_SCHEDULES, {
        refetchQueries: [{ query: GET_MY_ALL_SCHEDULES }]
    })

    const createManySchedules = async(trainingSchedule: string, startDate: string, endDate: string, dayOfWeek: string ) => {
        try {
            await createManySchedulesMutation({
                variables: { trainingSchedule, startDate, endDate, dayOfWeek }
            })
            showMessage({ title: "スケジュールを作成しました。", status: "success" })
        } catch (err) {
            alert(err)
        }
    }

    return { createManySchedules }
}