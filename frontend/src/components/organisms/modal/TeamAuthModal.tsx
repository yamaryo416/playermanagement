import { VFC } from 'react'
import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Heading, Link, Stack, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { useLazyQuery } from "@apollo/react-hooks"
import { useRecoilState } from 'recoil'

import { useTeam } from '../../../hooks/useTeam'
import { teamAuthModalState } from '../../../store/teamAuthModalState'

export const TeamAuthModal: VFC = () => {
    const [teamAuthModal, setTeamAuthModal] = useRecoilState(teamAuthModalState);
    const { isJoin,
            isSearch,
            name,
            password,
            loadingOneTeam,
            dataOneTeam,
            onClickChangeMode,
            onChangeName,
            onChangePassword,
            createTeam,
            searchTeam,
            joinTeam
          } = useTeam()

    const onCloseTeamAuthModal =  () => setTeamAuthModal(false)

    return (
        <Modal
            closeOnOverlayClick={false}
            isOpen={teamAuthModal}
            onClose={() => setTeamAuthModal(false)}
            autoFocus={false}
            size="md"
        >
            <ModalOverlay />
            <ModalContent textAlign="center">
                <ModalHeader textAlign="center">{isJoin ? 'チーム加入' : 'チーム作成'}</ModalHeader>
                <ModalCloseButton />
                {isSearch ? (loadingOneTeam ? (
                    <ModalBody>loading...</ModalBody>
                ) : (
                    <>
                        <ModalBody color="black">
                            <Heading as="h3">以下のチームに加入します。よろしいですか？</Heading>
                            <Text>チーム名: {dataOneTeam?.team.name}</Text>
                            <Button onClick={() => joinTeam() }>加入する</Button>
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => setTeamAuthModal(false)}>スキップ</Button>
                        </ModalFooter>
                    </>
                )):(
                    <>
                        <ModalBody color="black" pb={6}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                isJoin ? searchTeam() : createTeam()
                            }}>
                                <Stack spacing={4}>
                                    <FormControl>
                                        <FormLabel>チーム名</FormLabel>
                                        <Input value={name} onChange={onChangeName} />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>パスワード</FormLabel>
                                        <Input value={password} onChange={onChangePassword} />
                                    </FormControl>
                                    <Button type="submit">{isJoin ? 'チームに加入する' : 'チームを作成する'}</Button>
                                </Stack>
                            </form>
                        </ModalBody>
                        <ModalFooter px={4} justifyContent="space-between">
                            <Link verticalAlign="middle" onClick={onClickChangeMode}>{isJoin ? 'チームを作成する場合はこちら' : '既にあるチームに参加する場合はこちら'}</Link>
                            <Button onClick={onCloseTeamAuthModal}>スキップ</Button>
                        </ModalFooter>
                    </>
                )}
                
            </ModalContent>
        </Modal>
    )
}
