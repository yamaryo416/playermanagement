import { useMutation, useQuery } from "@apollo/client"
import { Button } from "@chakra-ui/button"
import { FormControl, FormLabel } from "@chakra-ui/form-control"
import { Input } from "@chakra-ui/input"
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import { VFC } from "react"
import { useTeam } from "../../hooks/useTeam"
import { CREATE_POST, GET_MY_TEAM_POSTS } from "../../queries"
import { MyTeamPostsType } from "../../types/queriesType"
import { PrimaryButton } from "../atoms/button/PrimaryButton"
import { SpeechBallon } from "../molecules/SpeechBallon"
import { SectionCard } from "../organisms/layout/SectionCard"
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

type Props = {
    myId: string | undefined;
    teamName: string | undefined;
    introduction: string | undefined;
    coachName: String | undefined;
    isCoach: boolean | undefined;
}

export const TeamBoardSection: VFC<Props> = (props) => {
    const { myId, teamName, introduction, coachName, isCoach } = props;

    const { text, onChangeText, createPost } = useTeam();

    const { 
        loading: loadingMyTeamPosts,
        data: dataMyTeamPosts,
        error: errorMyTeamPosts
    } = useQuery<MyTeamPostsType>(GET_MY_TEAM_POSTS, {
        fetchPolicy: "cache-and-network",
    })

    if (loadingMyTeamPosts) return <Spinner />
    else if (errorMyTeamPosts) return <Heading>error: {errorMyTeamPosts.message}</Heading>

    return (
        <SectionCard>
            <Heading textAlign="center" fontSize="20px" pb={10} color="blue.">{teamName ? teamName : null}の掲示板</Heading>
            <Box pb={10}>
                <Text pb={10}>
                    コーチ: {coachName}
                </Text>
                <Text>
                    {introduction ?? "記載はありません。"}
                </Text>
            </Box>
            <Heading textAlign="center" fontSize="20px" pb={10}>投稿</Heading>
            <Box>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    createPost()
                }}>
                    <Flex pb={10}>
                        <Input value={text} onChange={onChangeText} borderColor="gray.500" />
                        <Button type="submit" bg="yellow.400" color="black">投稿する</Button>
                    </Flex>
                </form>
                {dataMyTeamPosts?.myTeamPosts.edges?.length === 0 ? <Text textAlign="center">投稿はありません。</Text> : null}
                {dataMyTeamPosts?.myTeamPosts.edges?.map((post) => (
                    <Box>
                        {myId === post.node.profilePost.id ? (
                            <Flex justify="flex-end" mb="20px">
                                <SpeechBallon isMyPost={true}>{post.node.text}</SpeechBallon>
                                <Box textAlign="center">
                                    <AccountCircleIcon />
                                    <Text>
                                        {post.node.profilePost.nickname}
                                    </Text>
                                </Box>
                            </Flex>
                        ) : (
                            <Flex mb="20px">
                                <Box textAlign="center">
                                    <AccountCircleIcon />
                                    <Text>
                                        {post.node.profilePost.nickname}
                                    </Text>
                                </Box>
                                <SpeechBallon isMyPost={false}>{post.node.text}</SpeechBallon>
                            </Flex>
                        )}
                    </Box>
                ))}
            </Box>
        </SectionCard>
    )
}

