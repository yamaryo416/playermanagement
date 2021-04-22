import { memo, VFC } from 'react'
import { Heading, Link } from '@chakra-ui/layout'

import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { useControllModal } from '../../hooks/useControllModal'

export const HeaderForGeneralUser: VFC = memo(() => {
    const { onOpenUserAuthModal } = useControllModal()

    return (
        <HeaderLayout>
            <Heading as="h1" size="lg">
                選手管理APP
            </Heading>
            <Link onClick={onOpenUserAuthModal}>ログイン</Link>
        </HeaderLayout>
    )
})
