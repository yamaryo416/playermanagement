import { useMutation } from "@apollo/client";
import { ChangeEvent, useState } from "react"
import { useSetRecoilState } from "recoil";
import { CREATE_TRAINING } from "../queries";
import { trainingCreateModalState } from "../store/triningCreateModalState";
import { useMessage } from "./useMessage";

export const useTraining = () => {
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(0);
    const [distance, setDistance] = useState(0);
    const [description, setDescription] = useState("")

    const setTrainingCreateModal = useSetRecoilState(trainingCreateModalState)
    const { showMessage } = useMessage()

    const [createTrainingMutation] = useMutation(CREATE_TRAINING)

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))
    const onChangeDistance = (e: ChangeEvent<HTMLInputElement>) => setDistance(Number(e.target.value))
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)

    const createTraining = async () => {
        try {
            if (title === "") {
                throw "トレーニング名を入力してください。"
            }
            await createTrainingMutation({
                variables: { title, count, distance, description }
            })
            showMessage({ title: "トレーニングを作成しました。", status: "success" })
            setTrainingCreateModal(false)
        } catch (err) {
            showMessage({ title: err, status: "error" })
        }
    }

    return ({ title,
              count,
              distance,
              description,
              onChangeTitle,
              onChangeCount,
              onChangeDistance,
              onChangeDescription,
              createTraining 
            }) 
}