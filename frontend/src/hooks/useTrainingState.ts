import { ChangeEvent, useCallback, useState } from "react"

export const useTrainingState = () => {
    const [title, setTitle] = useState("");
    const [count, setCount] = useState<number | undefined>(undefined);
    const [load, setLoad] = useState<number | undefined>(undefined);
    const [distance, setDistance] = useState<number | undefined>(undefined);
    const [iconNumber, setIconNumber] = useState(0);
    const [description, setDescription] = useState("")
    const [isIconSelect, setIsIconSelect] = useState(false)

    const onChangeTitle = useCallback((e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value), [])
    const onChangeCount = useCallback((e: ChangeEvent<HTMLInputElement>) => setCount(Number(e.target.value)), [])
    const onChangeLoad = useCallback((e: ChangeEvent<HTMLInputElement>) => setLoad(Number(e.target.value)), [])
    const onChangeDistance = useCallback((e: ChangeEvent<HTMLInputElement>) => setDistance(Number(e.target.value)), [])
    const onChangeDescription = useCallback((e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value), [])
    const onChangeIconNumber = useCallback((e: ChangeEvent<HTMLInputElement>) => setIconNumber(Number(e.target.value)), [])
    const onChangeIsIconSelect = useCallback(() => setIsIconSelect(!isIconSelect), [isIconSelect])
    const resetState = useCallback(() => {
        setTitle("")
        setCount(undefined)
        setLoad(undefined)
        setDistance(undefined)
        setIconNumber(0)
        setDescription("")
    }, [])

    return ({ 
        title,
        count,
        load,
        distance,
        iconNumber,
        description,
        isIconSelect,
        onChangeTitle,
        onChangeCount,
        onChangeLoad,
        onChangeDistance,
        onChangeDescription,
        onChangeIconNumber,
        onChangeIsIconSelect,
        resetState
    }) 
}