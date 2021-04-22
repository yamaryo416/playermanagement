import { useQuery } from "@apollo/client"

import { GET_MY_TRAININGS } from "../../queries"
import { MyTrainingsType } from "../../types/queriesType"

export const useGetMyTrainings = () => {
    const { loading: loadingMyTrainings, data: dataMyTrainings, error: errorMyTrainings } = useQuery<MyTrainingsType>(GET_MY_TRAININGS, {
        fetchPolicy: "cache-and-network",
    })

    return {
        loadingMyTrainings,
        dataMyTrainings,
        errorMyTrainings
    }
}