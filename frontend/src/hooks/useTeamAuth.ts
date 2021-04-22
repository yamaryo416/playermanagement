import { useMutation } from "@apollo/client"
import { useLazyQuery } from "@apollo/react-hooks"
import { useHistory } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { CREATE_TEAM, GET_MY_PROFILE, GET_ONE_TEAM_FROM_ID, GET_ONE_TEAM_FROM_NAME, UPDATE_MY_PROFILE_TEAM } from "../queries"
import { teamAuthModalState } from "../store/teamAuthModalState"
import { OneTeamFromIdType, OneTeamFromNameType, TeamVars } from "../types/queriesType"
import { useMessage } from "./useMessage"

export const useTeamAuth = () => {
    const histroy = useHistory()

    const setTeamAuthModal = useSetRecoilState(teamAuthModalState)

    const { showMessage } = useMessage()

    const [getOneTeamFromNameQuery, {
        loading: loadingOneTeamFromName,
        data: dataOneTeamFromName,
        error: errorOneTeamFromName
    }] = useLazyQuery<OneTeamFromNameType, TeamVars>(GET_ONE_TEAM_FROM_NAME, {
        fetchPolicy: "cache-and-network",
    })
    const[getOneTeamFromIdQuery, {
        loading: loadingOneTeamFromId,
        data: dataOneTeamFromId
    }] = useLazyQuery<OneTeamFromIdType>(GET_ONE_TEAM_FROM_ID, {
        fetchPolicy: "cache-and-network"
    })

    const [createTeamMutation] = useMutation(CREATE_TEAM)
    const [updateMyProfileTeamMutation] = useMutation(UPDATE_MY_PROFILE_TEAM, {
        refetchQueries: [{ query: GET_MY_PROFILE }],
    })

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


    return ({ 
        loadingOneTeamFromName,
        dataOneTeamFromName,
        getOneTeamFromIdQuery,
        loadingOneTeamFromId,
        dataOneTeamFromId,
        createTeam,
        searchTeam,
        joinTeam,
    })
}
