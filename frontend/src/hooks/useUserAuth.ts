import { useMutation } from "@apollo/client"
import { useCallback } from "react"
import { useHistory } from "react-router"
import { useSetRecoilState } from "recoil"
import { CREATE_PROFILE, CREATE_USER, GET_TOKEN } from "../queries"
import { teamAuthModalState } from "../store/teamAuthModalState"
import { useMessage } from "./useMessage"

type UserVars = {
    nickname: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const useUserAuth = () => {
    const history = useHistory()

    const setTeamAuthModal = useSetRecoilState(teamAuthModalState);

    const { showMessage } = useMessage()

    const [getTokenMutation] = useMutation(GET_TOKEN)
    const [createUserMutation] = useMutation(CREATE_USER)
    const [createMyProfileMutation] = useMutation(CREATE_PROFILE)

    const passwordValidation = useCallback((password: string, password_confirmation: string) => {
        if (password !== password_confirmation) {
            throw new Error("パスワードが一致しません。")
        }
    }, [])

    console.log("useAuth")

    const signup = useCallback(async (values: UserVars) => {
        const {nickname, email, password, password_confirmation} = values
        try {
            passwordValidation(password, password_confirmation)
            await createUserMutation({
                variables: {email, password},
            })
            const result =  await getTokenMutation({
                variables: {email, password}
            })
            localStorage.setItem("token", result.data.tokenAuth.token)
            await createMyProfileMutation({
                variables: {nickname}
            })
            showMessage({ title: "ユーザーを作成しました！！", status: "success" })
            setTeamAuthModal(true)
            history.push("/team")
        } catch(err) {
            if (err.message.includes("duplicate")) {
                showMessage({ title: "Eメールは既に使われています。", status: "error" })
            } else {
                showMessage({ title: err.message, status: "error" })
            }
        }
    }, [])

    const login =  useCallback(async (email: string, password: string) => {
        try {
            const result =  await getTokenMutation({
                variables: {email, password}
            })
            localStorage.setItem("token", result.data.tokenAuth.token)
            showMessage({ title: "ログインしました！", status: "success" })
            history.push("/main")
        } catch(err) {
            if (err.message.includes("credentials")) {
                showMessage({ title: "Eメール、もしくはパスワードが間違っています。", status: "error" })
            }
        }
    }, [])

    const logout =  useCallback(() => {
        localStorage.removeItem("token");
        history.push("/")
        showMessage({ title: "ログアウトしました。", status: "success" })
    }, [])


    return { signup, login, logout }
}