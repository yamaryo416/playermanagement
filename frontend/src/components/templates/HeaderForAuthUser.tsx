import { Box, Heading, Link, Text } from '@chakra-ui/layout';
import React, { memo, VFC } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useUser } from '../../hooks/useUser';
import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { Menu } from '@material-ui/icons';

type Props = {
    nickname: string | undefined;
    teamname: string | undefined;
}

export const HeaderForAuthUser: VFC<Props> = memo((props) => {
    const { nickname, teamname } = props;

    const { logout } = useUser()

    return (
        <HeaderLayout>
            <Heading as="h3">{teamname}</Heading>
            <Heading as="h4">{nickname}</Heading>
            <Box onClick={logout}>
                ログアウト
                <ExitToAppIcon />
            </Box>
        </HeaderLayout>
    )
})
