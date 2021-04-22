import { memo, VFC } from 'react'

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
