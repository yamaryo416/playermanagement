import { memo, VFC } from 'react'
import { Box, Heading } from '@chakra-ui/layout';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import GroupIcon from '@material-ui/icons/Group';

import { HeaderLayout } from '../organisms/layout/HeaderLayout'
import { useUserAuth } from '../../hooks/useUserAuth';
import { useControllModal } from '../../hooks/useControllModal';

type Props = {
    nickname: string | undefined;
    teamname: string | undefined;
}

export const HeaderForAuthUser: VFC<Props> = memo((props) => {
    const { nickname, teamname } = props;

    const { onOpenTeamAuthModal } = useControllModal()
    const { logout } = useUserAuth()

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
