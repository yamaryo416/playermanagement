import { useQuery } from '@apollo/react-hooks'
import { useLazyQuery } from '@apollo/client'
import { GET_MY_PROFILE } from '../queries'
import { MyProfileType } from '../types/queriesType'

const useProfile = () => {
    const [
        getMyProfile,
        { loading: loadingMyProfile, data: dataMyProfile, error: errorMyProfile },
    ] = useLazyQuery<MyProfileType>(GET_MY_PROFILE, {
        fetchPolicy: "cache-and-network",
    })
    
    return ({ getMyProfile,
              loadingMyProfile,
              dataMyProfile,
              errorMyProfile
            })
}

export default useProfile
