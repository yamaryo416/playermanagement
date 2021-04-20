import { Box, Flex, Text } from "@chakra-ui/layout"
import { ReactNode, VFC } from "react"
import styled from "styled-components"

type Props = {
    isMyPost: boolean;
    children: ReactNode;
}

export const SpeechBallon: VFC<Props> = (props) => {
    const { isMyPost, children } = props

    if (isMyPost) return (
        <Box>
            <MyText>{children}</MyText>
            <MyTriangle />
        </Box>
    )

    return (
        <Box>
            <OtherTriangle />
            <OtherText>{children}</OtherText>
        </Box>
    )
}

const MyTriangle = styled.div`
    display: inline-block;
    postion: absolute;
    transform: rotate(45deg) translateY(80%) translateX(-40%);
    border-right: 10px solid rgb(255, 255, 0);
    height: 10px;
`

const MyText = styled.div`
    display: inline-block;
    background-color: rgb(255, 255, 0);
    border-radius: 20px;
    vertical-align: top;
    max-width: 300px;
    padding-top: 5px;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 5px;
    color: black;
`;


const OtherTriangle = styled.div`
    display: inline-block;
    postion: absolute;
    transform: rotate(45deg) translateY(-40%) translateX(80%);
    border-right: 10px solid white;
    height: 10px;
`;

const OtherText = styled.div`
    display: inline-block;
    background-color: white;
    border-radius: 20px;
    vertical-align: top;
    padding: 5px 20px;
    min-width: 120px;
    max-width: 300px;
    color: black;
`;
