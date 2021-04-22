import { useQuery } from "@apollo/client"

import { GET_MY_TEAM_POSTS } from "../../queries"
import { MyTeamPostsType } from "../../types/queriesType"


export const useGetMyTeamPosts = () => {
    const {
        loading: loadingMyTeamPosts,
        data: dataMyTeamPosts,
        error: errorMyTeamPosts 
    } = useQuery<MyTeamPostsType>(GET_MY_TEAM_POSTS, {
      fetchPolicy: "cache-and-network",
  })

  return {
      loadingMyTeamPosts,
      dataMyTeamPosts,
      errorMyTeamPosts
  }
}