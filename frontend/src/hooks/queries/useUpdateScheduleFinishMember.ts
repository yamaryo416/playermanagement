import { useMutation } from "@apollo/client"
import { useCallback } from "react"
import { useRecoilValue } from "recoil"
import { GET_ONE_DAY_SCHEDULES, UPDATE_SCHEDULE } from "../../queries"
import { scheduleOneDayState } from "../../store/scheduleOneDayState"

export const useUpdateScheduleFinishMember = () => {
    const oneDay = useRecoilValue(scheduleOneDayState)

    const [updateScheduleFinishMemberMutation] = useMutation(UPDATE_SCHEDULE, {
        refetchQueries: [{ 
            query: GET_ONE_DAY_SCHEDULES,
            variables: { date: oneDay }
        }]
    })

    const updateScheduleFinishMember = useCallback(async (id: string, userId: string) => {
        await updateScheduleFinishMemberMutation({
            variables: { id, userId }
        })
    }, [])
    
    return { updateScheduleFinishMember }
}

