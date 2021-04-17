import { Box, Flex } from '@chakra-ui/layout'
import React, { memo, ReactNode, VFC } from 'react'

type Props = {
    children: ReactNode
}

export const HeaderLayout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <Box pos="fixed" bg="gray.800" width="100%" height="80px" as="nav">
            <Flex
                justify="space-between"
                align="center"
                wrap="wrap"
                bg="black"
                px={10}
                color="white"
                lineHeight="80px"
            >
                {children}
            </Flex>
        </Box>
    )
})
