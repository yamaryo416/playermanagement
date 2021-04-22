import { useCallback } from "react"
import { useRecoilState } from "recoil"
import { confirmTeamJoinModalState } from "../store/confirmTeamJoinModalState"
import { scheduleCreateModalState } from "../store/scheduleCreateModalState"
import { teamAuthModalState } from "../store/teamAuthModalState"
import { trainingCreateModalState } from "../store/triningCreateModalState"
import { userAuthModalState } from "../store/userAuthModalState"

export const useControllModal = () => {
    const [userAuthModal, setUserAuthModal] = useRecoilState(userAuthModalState)
    const [teamAuthModal, setTeamAuthModal] = useRecoilState(teamAuthModalState)
    const [confirmTeamJoinModal, setConfirmTeamJoinModal] = useRecoilState(confirmTeamJoinModalState)
    const [trainingCreateModal, setTrainingCreateModal] = useRecoilState(trainingCreateModalState)
    const [scheduleCreateModal, setScheduleCreateModal] = useRecoilState(scheduleCreateModalState)

    const onOpenUserAuthModal = useCallback(() => setUserAuthModal(true), [])
    const onCloseUserAuthModal = useCallback(() => setUserAuthModal(false), [])
    const onOpenTeamAuthModal = useCallback(() => setTeamAuthModal(true), [])
    const onCloseTeamAuthModal = useCallback(() => setTeamAuthModal(false), [])
    const onOpenConfrimTeamJoinModal = useCallback(() => setConfirmTeamJoinModal(true), [])
    const onCloseConfrimTeamJoinModal = useCallback(() => setConfirmTeamJoinModal(false), [])
    const onOpenTrainingCreateModal = useCallback(() => setTrainingCreateModal(true), [])
    const onCloseTrainingCreateModal = useCallback(() => setTrainingCreateModal(false), [])
    const onOpenScheduleCreateModal = useCallback(() => setScheduleCreateModal(true), [])
    const onCloseScheduleCreateModal = useCallback(() => setScheduleCreateModal(false), [])

    return {
        userAuthModal,
        teamAuthModal,
        confirmTeamJoinModal,
        trainingCreateModal,
        scheduleCreateModal,
        onOpenUserAuthModal,
        onCloseUserAuthModal,
        onOpenTeamAuthModal,
        onCloseTeamAuthModal,
        onOpenConfrimTeamJoinModal,
        onCloseConfrimTeamJoinModal,
        onOpenTrainingCreateModal,
        onCloseTrainingCreateModal,
        onOpenScheduleCreateModal,
        onCloseScheduleCreateModal
    }
}