import { useMutation } from "@apollo/client";
import { ChangeEvent, memo, useCallback, useState } from "react"
import { useRecoilState } from "recoil";
import { CREATE_TRAINING, GET_MY_TRAININGS, GET_ONE_DAY_SCHEDULES, GET_SINGLE_TRAININGS, UPDATE_SCHEDULE, UPDATE_TRAINING_NICE } from "../queries";
import { trainingDetailModalState } from "../store/trainingDetailModalState";
import { trainingCreateModalState } from "../store/triningCreateModalState";
import { trainingSelectedState } from "../store/trainingSelectedState"
import { useMessage } from "./useMessage";
import { useCalendar } from "./useCalendar";

export const useTraining = () => {
    const [title, setTitle] = useState("");
    const [count, setCount] = useState(0);
    const [load, setLoad] = useState(0);
    const [distance, setDistance] = useState(0);
    const [iconNumber, setIconNumber] = useState(0);
    const [description, setDescription] = useState("")

    const [trainingCreateModal, setTrainingCreateModal] = useRecoilState(trainingCreateModalState)
    const [trainingDetailModal, setTrainingDetailModal] = useRecoilState(trainingDetailModalState)
    const [trainingSelected, setTrainingSelected] = useRecoilState(trainingSelectedState)

    const { oneDay } = useCalendar()

    const { showMessage } = useMessage()

    const [createTrainingMutation] = useMutation(CREATE_TRAINING, {
        refetchQueries: [{ query: GET_MY_TRAININGS }],
    })
    const [updateTrainingNiceMutation] = useMutation(UPDATE_TRAINING_NICE, {
        refetchQueries: [{ query: GET_MY_TRAININGS }],
    })

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)
    const onChangeCount = (e: ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value))
    const onChangeLoad = (e: ChangeEvent<HTMLInputElement>) => setLoad(Number(e.target.value))
    const onChangeDistance = (e: ChangeEvent<HTMLInputElement>) => setDistance(Number(e.target.value))
    const onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)
    const onChangeIconNumber = (e: ChangeEvent<HTMLInputElement>) => setIconNumber(Number(e.target.value))
    const onOpenTrainingCreateModal = () => setTrainingCreateModal(true)
    const onCloseTrainingCreateModal = () => setTrainingCreateModal(false)
    const onOpenTrainingDetailModal = () => setTrainingDetailModal(true)
    const onCloseTrainingDetailModal = () => setTrainingDetailModal(false)
    const onClickSelectedTraining = (
        title: string,
        count: number | null, 
        load: number | null,
        distance: number | null,
        description: string
    ) => {
        setTrainingSelected({ title, count, load, distance, description })
        setTrainingDetailModal(true)
    }

    const createTraining = async () => {
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
    }
    
    const updateTrainingNice = useCallback(async (id: string, userId: string) => {
        try {
            await updateTrainingNiceMutation({
                variables: { id, userId }
            })
        } catch (err) {
            alert(err)
        }
    }, [])

   

    return ({ 
        title,
        count,
        load,
        distance,
        iconNumber,
        description,
        trainingCreateModal,
        trainingDetailModal,
        trainingSelected,
        setTrainingSelected,
        setTrainingDetailModal,
        onChangeTitle,
        onChangeCount,
        onChangeLoad,
        onChangeDistance,
        onChangeDescription,
        onChangeIconNumber,
        onOpenTrainingCreateModal,
        onCloseTrainingCreateModal,
        onOpenTrainingDetailModal,
        onCloseTrainingDetailModal,
        onClickSelectedTraining,
        createTraining,
        updateTrainingNice,
    }) 
}