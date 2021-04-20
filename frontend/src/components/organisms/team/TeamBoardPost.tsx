import { VFC } from "react";
import { useQuery } from "@apollo/client";
import { Button } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { useTeam } from "../../../hooks/useTeam";
import { GET_MY_TEAM_POSTS } from "../../../queries";
import { MyTeamPostsType } from "../../../types/queriesType";
import { SpeechBallon } from "../../molecules/SpeechBallon";

type Props = {
    myId: string | undefined;
}

export const TeamBoardPost: VFC<Props> = (props) => {
    const { myId } = props;

    const { text, onChangeText, createPost } = useTeam()

    const { 
        loading: loadingMyTeamPosts,
        data: dataMyTeamPosts
    } = useQuery<MyTeamPostsType>(GET_MY_TEAM_POSTS, {
        fetchPolicy: "cache-and-network",
    })

    if (loadingMyTeamPosts) return <Spinner />
    return(
        <>
            <Heading textAlign="center" fontSize="20px" pb={10}>投稿</Heading>
            <Box>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    createPost()
                }}>
                    <Flex pb={10}>
                        <Input value={text} onChange={onChangeText} borderColor="gray.500" />
                        <Button type="submit" bg="rgb(255, 255, 0)" color="black">投稿</Button>
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
        </>
    )
}