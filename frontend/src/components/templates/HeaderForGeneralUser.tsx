import { memo, VFC } from 'react'
import { Heading, Link } from '@chakra-ui/layout'

import { useUser } from '../../hooks/useUser'
import { HeaderLayout } from '../organisms/layout/HeaderLayout'

export const HeaderForGeneralUser: VFC = memo(() => {
    
    const { onOpenUserAuthModal } = useUser()

    return (
        <HeaderLayout>
            <Heading as="h1" size="lg">
                選手管理APP
            </Heading>
            <Link onClick={onOpenUserAuthModal}>ログイン</Link>
        </HeaderLayout>
    )
})

