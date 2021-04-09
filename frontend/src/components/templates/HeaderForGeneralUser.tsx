import { Heading, Link } from '@chakra-ui/layout'
import React, { memo, VFC } from 'react'
import { useSetRecoilState } from 'recoil'
import { userAuthModalState } from '../../store/userAuthModalState'
import { HeaderLayout } from '../organisms/layout/HeaderLayout'

export const HeaderForGeneralUser: VFC = memo(() => {
    
    const  setUserAuthModal = useSetRecoilState(userAuthModalState)

    const onOpenUserAuthModal = () => setUserAuthModal(true)

    return (
        <HeaderLayout>
            <Heading as="h1" size="lg">
                選手管理APP
            </Heading>
            <Link onClick={onOpenUserAuthModal}>ログイン</Link>
        </HeaderLayout>
    )
})

