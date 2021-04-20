import { useMutation } from "@apollo/client"
import { useLazyQuery } from "@apollo/react-hooks"
import { ChangeEvent, useState } from "react"
import { useHistory } from "react-router-dom"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"
import { CREATE_POST, CREATE_TEAM, GET_MY_PROFILE, GET_MY_TEAM_POSTS, GET_ONE_TEAM_FROM_ID, GET_ONE_TEAM_FROM_NAME, UPDATE_MY_PROFILE_TEAM } from "../queries"
import { confirmTeamJoinModalState } from "../store/confirmTeamJoinModalState"
import { teamAuthModalState } from "../store/teamAuthModalState"
import { teamDetailState } from "../store/teamDetailState"
import { OneTeamFromIdType, OneTeamFromNameType, TeamVars } from "../types/queriesType"
import { useMessage } from "./useMessage"

export const useTeam = () => {
    const histroy = useHistory()

    const [isJoin, setIsJoin] = useState(true)
    const [isSearch, setIsSearch] = useState(false)
    const [name, setName] = useState("")
    const [isAnyoneJoin, setIsAnyoneJoin] = useState(true)
    const [password, setPassword] = useState("")
    const [text, setText] = useState("")

    const [teamAuthModal, setTeamAuthModal] = useRecoilState(teamAuthModalState)
    const [confirmTeamJoinModal, setConfirmTeamJoinModal] = useRecoilState(confirmTeamJoinModalState)
    const [isTeamDetail, setIsTeamDetail] = useRecoilState(teamDetailState)

    const { showMessage } = useMessage()

    const [getOneTeamFromNameQuery, { loading: loadingOneTeamFromName, data: dataOneTeamFromName, error: errorOneTeamFromName }] = useLazyQuery<OneTeamFromNameType, TeamVars>(GET_ONE_TEAM_FROM_NAME, {
        fetchPolicy: "cache-and-network",
    })

    const[getOneTeamFromIdQuery, { loading: loadingOneTeamFromId, data: dataOneTeamFromId }] = useLazyQuery<OneTeamFromIdType>(GET_ONE_TEAM_FROM_ID, {
        fetchPolicy: "cache-and-network"
    })
    

    const [createTeamMutation] = useMutation(CREATE_TEAM)
    const [createPostMutation] = useMutation(CREATE_POST, {
        refetchQueries: [{ query: GET_MY_TEAM_POSTS }],
    })
    const [updateMyProfileTeamMutation] = useMutation(UPDATE_MY_PROFILE_TEAM, {
        refetchQueries: [{ query: GET_MY_PROFILE }],
    })

    const onClickChangeMode = () => setIsJoin(!isJoin);
    const onOpenTeamAuthModal = () => setTeamAuthModal(true)
    const onCloseTeamAuthModal = () => setTeamAuthModal(false)
    const onOpenConfrimTeamJoinModal = () => setConfirmTeamJoinModal(true)
    const onCloseConfrimTeamJoinModal = () => setConfirmTeamJoinModal(false)
    const onChangeTeamDetail = () => setIsTeamDetail(!isTeamDetail)
    const onCloseIsSearch = () => setIsSearch(false)
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
    const onChangeIsAnyoneJoin = () => setIsAnyoneJoin(!isAnyoneJoin)
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const onChangeText = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);
    

    const createTeam = async (name: string, isAnyoneJoin: boolean, password: string) => {
        try {
            const team = await createTeamMutation({
                variables: {name, isAnyoneJoin, password}
            })
            await updateMyProfileTeamMutation({
                variables: {teamProf: team.data.createTeam.team.id, isCoach: true}
            })
            showMessage({ title: "チームを作成しました!", status: "success" })
            setTeamAuthModal(false)
            histroy.push("/main")
        } catch (err) {
            showMessage({ title: "チーム名は既に使われています。", status: "error"})
        }
    }

    const searchTeam = async (name: string, password: string) => {
        await getOneTeamFromNameQuery({
            variables: {name, password}
        })
    }

    const joinTeam = async (id: string) => {
        try {
            await updateMyProfileTeamMutation({
                variables: {teamProf: id , isCoach: false }
            })
            showMessage({ title: "チームに加入しました!", status: "success" })
            histroy.push("/main")
        } catch (err) {
            alert(err)
        }
    }

    const createPost = async () => {
        try {
            await createPostMutation({
                variables: {text}
            })
            showMessage({ title: "投稿しました!", status: "success" })
        } catch (err) {
            alert(err)
        }
    }

    return ({ 
        isJoin,
        isSearch,
        setIsSearch,
        name,
        isAnyoneJoin,
        password,
        text,
        isTeamDetail,
        teamAuthModal,
        setTeamAuthModal,
        confirmTeamJoinModal,
        loadingOneTeamFromName,
        dataOneTeamFromName,
        getOneTeamFromIdQuery,
        loadingOneTeamFromId,
        dataOneTeamFromId,
        onClickChangeMode,
        onOpenTeamAuthModal,
        onCloseTeamAuthModal,
        onOpenConfrimTeamJoinModal,
        onCloseConfrimTeamJoinModal,
        onChangeTeamDetail,
        onCloseIsSearch,
        onChangeName,
        onChangeIsAnyoneJoin,
        onChangePassword,
        onChangeText,
        createTeam,
        searchTeam,
        joinTeam,
        createPost
    })
}
