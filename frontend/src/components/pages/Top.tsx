import { memo, useState, VFC } from 'react'
import { useDisclosure } from '@chakra-ui/hooks'
import { UserAuthModal } from '../organisms/modal/UserAuthModal'
import { HeaderForGeneralUser } from '../templates/HeaderForGeneralUser';

export const Top: VFC = memo(() => {
    return (
        <> 
            <HeaderForGeneralUser />
            <UserAuthModal />
        </>
    )
})
