import { ChangeEvent, useCallback, useState } from "react"
import { useMutation } from "@apollo/client"

import { CREATE_POST, GET_MY_TEAM_POSTS } from "../../queries"
import { useMessage } from "../useMessage"

export const useCreatePost = () => {
    const [text, setText] = useState("")

    const [createPostMutation] = useMutation(CREATE_POST, {
        refetchQueries: [{ query: GET_MY_TEAM_POSTS }],
    })

    const onChangeText = useCallback((e: ChangeEvent<HTMLInputElement>) => setText(e.target.value), [])

    const { showMessage } = useMessage()

    const createPost = useCallback(async () => {
        if (text !== "") {
            await createPostMutation({
                variables: {text}
            })
            showMessage({ title: "投稿しました!", status: "success" })
            setText("")
        } else {
            showMessage({ title: "一文字以上入力してください。", status: "error" })
        }
    }, [text])

    console.log("useCreatePost")

    return ({
        text,
        onChangeText,
        createPost
    })
}