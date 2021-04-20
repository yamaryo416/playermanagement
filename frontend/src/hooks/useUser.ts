import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { CREATE_PROFILE, CREATE_USER, GET_TOKEN } from '../queries'
import { teamAuthModalState } from '../store/teamAuthModalState'
import { userAuthModalState } from '../store/userAuthModalState'
import { useMessage } from './useMessage'

type UserVars = {
    nickname: string;
    email: string;
    password: string;
    password_confirmation: string;
}


export const useUser = () => {
    const history = useHistory()
    
    const { showMessage } = useMessage()

    const [userAuthModal, setUserAuthModal] = useRecoilState(userAuthModalState)
    const setTeamAuthModal = useSetRecoilState(teamAuthModalState);

    const [isLogin, setIsLogin] = useState(true)

    const [getToken] = useMutation(GET_TOKEN)
    const [createUser] = useMutation(CREATE_USER)
    const [createMyProfile] = useMutation(CREATE_PROFILE)
    
    const onOpenUserAuthModal = () => setUserAuthModal(true)
    const onCloseUserAuthModal = () => setUserAuthModal(false)
    const onClickChangeMode = () => setIsLogin(!isLogin)
   
    const passwordValidation = (password: string, password_confirmation: string) => {
        if (password !== password_confirmation) {
            throw new Error("パスワードが一致しません。")
        }
    }

    const login = async (nickname: string, email: string, password: string) => {
        try {
            const result =  await getToken({
                variables: {email, password}
            })
            localStorage.setItem("token", result.data.tokenAuth.token)
            if (isLogin) {
                showMessage({ title: "ログインしました！", status: "success" })
                history.push("/main")
            } else {
                await createMyProfile({
                    variables: { nickname }
                })
                showMessage({ title: "ユーザーを作成しました！！", status: "success" })
                setTeamAuthModal(true)
                history.push("/team")
            }
         } catch (err) {
            if (err.message.includes("credentials")) {
                showMessage({ title: "Eメール、もしくはパスワードが間違っています。", status: "error" })
            }
         }
    }

    const loginOrSignup = async (values: UserVars) => {
        const {nickname, email, password, password_confirmation} = values

        if (isLogin) {
            login(nickname, email, password)
        } else {
            try {
                passwordValidation(password, password_confirmation)
                await createUser({
                    variables: {email, password},
                })
                login(nickname, email, password)
            } catch(err) {
              if (err.message.includes("duplicate")) {
                showMessage({ title: "Eメールは既に使われています。", status: "error" })
              }
            }
        }
    }

    const logout =  () => {
        localStorage.removeItem("token");
        history.push("/")
        showMessage({ title: "ログアウトしました。", status: "success" })
    }
    
    return ({
        userAuthModal,
        isLogin,
        onOpenUserAuthModal,
        onCloseUserAuthModal,
        onClickChangeMode,
        loginOrSignup,
        logout
    })
}

