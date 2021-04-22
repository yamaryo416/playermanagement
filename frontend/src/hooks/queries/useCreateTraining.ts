import { useCallback } from "react"
import { useMutation } from "@apollo/client"
import { useSetRecoilState } from "recoil"

import { CREATE_TRAINING, GET_MY_TRAININGS } from "../../queries"
import { trainingCreateModalState } from "../../store/triningCreateModalState"
import { useMessage } from "../useMessage"

export const useCreateTraining = () => {
    const setTrainingCreateModal = useSetRecoilState(trainingCreateModalState)

    const { showMessage } = useMessage()

    const [createTrainingMutation] = useMutation(CREATE_TRAINING, {
        refetchQueries: [{ query: GET_MY_TRAININGS }],
    })

    const createTraining = useCallback(async (
        title: string,
        count: number | undefined,
        load: number | undefined, 
        distance: number | undefined,
        description: string,
        iconNumber: number,
        ) => {
        try {
            if (title === "") {
                throw "トレーニング名を入力してください。"
            }
            await createTrainingMutation({
                variables: { title, count, load, distance, description, iconNumber }
            })
            showMessage({ title: "トレーニングを作成しました。", status: "success" })
            setTrainingCreateModal(false)
        } catch (err) {
            showMessage({ title: err, status: "error" })
        }
    }, [])

    return { createTraining }
}