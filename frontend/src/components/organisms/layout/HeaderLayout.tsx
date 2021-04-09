import { Flex } from '@chakra-ui/layout'
import React, { memo, ReactNode, VFC } from 'react'

type Props = {
    children: ReactNode
}

export const HeaderLayout: VFC<Props> = memo((props) => {
    const { children } = props;
    return (
        <Flex
            as="nav"
            justify="space-between"
            align="center"
            wrap="wrap"
            bg="gray.800"
            px={10}
            height="80px"
            color="gray.200"
        >
            {children}
        </Flex>
    )
})
