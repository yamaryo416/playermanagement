import { Box, Heading, Link, Text } from '@chakra-ui/layout';
import React, { memo, VFC } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useUser } from '../../hooks/useUser';
import { HeaderLayout } from '../organisms/layout/HeaderLayout'

type Props = {
    nickname: string;
    teamname: string;
}

export const HeaderForAuthUser: VFC<Props> = memo((props) => {
    const { nickname, teamname } = props;

    const { logout } = useUser()

    return (
        <HeaderLayout>
            <Heading as="h3">所属チーム: {teamname} </Heading>
            <Heading as="h4">ニックネーム: {nickname}</Heading>
            <Box onClick={logout}>
                ログアウト
                <ExitToAppIcon />
            </Box>
        </HeaderLayout>
    )
})
