import { useMutation } from "@apollo/client"
import { useLazyQuery } from "@apollo/react-hooks"
import { ChangeEvent, useState } from "react"
import { useSetRecoilState } from "recoil"
import { CREATE_TEAM, GET_MY_PROFILE, GET_ONE_TEAM, UPDATE_MY_PROFILE_TEAM } from "../queries"
import { teamAuthModalState } from "../store/teamAuthModalState"
import { OneTeamType, OneTeamVars } from "../types/queriesType"
import { useMessage } from "./useMessage"

export const useTeam = () => {
    const [isJoin, setIsJoin] = useState(true)
    const [isSearch, setIsSearch] = useState(false)
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const setTeamAuthModal = useSetRecoilState(teamAuthModalState)
    const { showMessage } = useMessage()

    const [getOneTeamQuery, { loading: loadingOneTeam, data: dataOneTeam, error: errorOneTeam }] = useLazyQuery<OneTeamType, OneTeamVars>(GET_ONE_TEAM, {
        fetchPolicy: "cache-and-network",
    })

    const [createTeamMutation] = useMutation(CREATE_TEAM)
    const [updateMyProfileTeamMutation] = useMutation(UPDATE_MY_PROFILE_TEAM, {
        refetchQueries: [{ query: GET_MY_PROFILE }],
    })

    const onClickChangeMode = () => setIsJoin(!isJoin);
    const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const createTeam = async () => {
        try {
            const team = await createTeamMutation({
                variables: {name, password}
            })
            await updateMyProfileTeamMutation({
                variables: {teamProf: team.data.createTeam.team.id, isCoach: true}
            })
            showMessage({ title: "チームを作成しました!", status: "success" })
            setTeamAuthModal(false)
        } catch (err) {
            alert(err)
        }
    }

    const searchTeam = async () => {
        try {
            await getOneTeamQuery({
                variables: {name, password}
            })
            setIsSearch(true)
        } catch(err) {
            alert(err)
        }
    }

    const joinTeam = async () => {
        try {
            await updateMyProfileTeamMutation({
                variables: {teamProf: dataOneTeam?.team.id , isCoach: false }
            })
            showMessage({ title: "チームに加入しました!", status: "success" })
            setIsSearch(false)
            setTeamAuthModal(false)
        } catch (err) {
            alert(err)
        }
    }

    return ({ isJoin,
              isSearch,
              name,
              password,
              loadingOneTeam,
              dataOneTeam,
              onClickChangeMode,
              onChangeName,
              onChangePassword,
              createTeam,
              searchTeam,
              joinTeam
            })
}
