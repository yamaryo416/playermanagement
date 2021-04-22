import { useQuery } from "@apollo/client"

import { GET_MY_ALL_SCHEDULES } from "../../queries"

export const useGetAllSchedules = () => {
    const {
        loading: loadingAllSchedules,
        data: dataAllSchedules,
        error: errorAllSchedules,
    } = useQuery(GET_MY_ALL_SCHEDULES, {
        fetchPolicy: "cache-and-network"
    })

    return {
        loadingAllSchedules,
        dataAllSchedules,
        errorAllSchedules,
    }
}