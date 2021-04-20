import { Box, Heading, Link, Text } from '@chakra-ui/layout';
import React, { memo, VFC } from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { useUser } from '../../hooks/useUser';
import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import GroupIcon from '@material-ui/icons/Group';
import { useTeam } from '../../hooks/useTeam';

type Props = {
    nickname: string | undefined;
    teamname: string | undefined;
}

export const HeaderForAuthUser: VFC<Props> = memo((props) => {
    const { nickname, teamname } = props;

    const { logout } = useUser()
    const { onOpenTeamAuthModal } = useTeam()

    return (
        <HeaderLayout>
            <Heading as="h3">{teamname}</Heading>
            <Menu>
                <MenuButton>{nickname}</MenuButton>
                <MenuList color="black">
                    <MenuItem h={10}>
                        <Box onClick={onOpenTeamAuthModal}>
                            チームに参加
                            <GroupIcon />
                        </Box>
                    </MenuItem>
                    <MenuItem h={10}>
                        <Box onClick={logout}>
                            ログアウト
                            <ExitToAppIcon />
                        </Box>
                    </MenuItem>
                </MenuList>
            </Menu>
        </HeaderLayout>
    )
})
