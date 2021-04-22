import { useMutation } from "@apollo/client"
import { useCallback } from "react"
import { GET_MY_TRAININGS, UPDATE_TRAINING_NICE } from "../../queries"

export const useUpdateTrainingNice = () => {
    const [updateTrainingNiceMutation] = useMutation(UPDATE_TRAINING_NICE, {
        refetchQueries: [{ query: GET_MY_TRAININGS }],
    })
    
    const updateTrainingNice = useCallback(async (id: string, userId: string) => {
        await updateTrainingNiceMutation({
            variables: { id, userId }
        })
    }, [])

    return { updateTrainingNice }
}