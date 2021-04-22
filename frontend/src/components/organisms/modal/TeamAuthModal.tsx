import { memo, useCallback, useState, VFC } from 'react'
import { Button } from '@chakra-ui/button'
import { Box, Heading, Link, Stack, Text } from '@chakra-ui/layout'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Formik } from 'formik'
import { object, string } from "yup"
import { Checkbox } from '@chakra-ui/checkbox'

import { useTeamAuth } from '../../../hooks/useTeamAuth'
import { PrimaryButton } from '../../atoms/button/PrimaryButton'
import { CustomForm } from '../../molecules/CustomForm'
import { ErrorText } from '../../atoms/text/ErrorText'
import { SecondaryButton } from '../../atoms/button/SecondaryButton'
import { useControllModal } from '../../../hooks/useControllModal'

export const TeamAuthModal: VFC = memo(() => {
    const [isJoin, setIsJoin] = useState(true)
    const [isAnyoneJoin, setIsAnyoneJoin] = useState(true)
    const [isSearch, setIsSearch] = useState(false)

    const { teamAuthModal, onCloseTeamAuthModal } = useControllModal()
    const { 
        dataOneTeamFromName,
        createTeam,
        searchTeam,
        joinTeam
    } = useTeamAuth()

    const onCloseIsSearch = useCallback(() => setIsSearch(false), [])
    const onClickChangeMode = useCallback(() => setIsJoin(!isJoin), [isJoin])
    const onChangeIsAnyoneJoin = useCallback(() => setIsAnyoneJoin(!isAnyoneJoin), [])

    return (
        <>
            <Modal
                closeOnOverlayClick={false}
                isOpen={teamAuthModal}
                onClose={onCloseTeamAuthModal}
                autoFocus={false}
                size="md"
            >
                <ModalOverlay />
                <ModalContent textAlign="center" color="black">
                    <ModalHeader textAlign="center">{isJoin ? 'チームに参加' : 'チーム作成'}</ModalHeader>
                    <ModalCloseButton />
                        {isSearch ? (
                            <>
                                <ModalBody pb={6}>
                                {dataOneTeamFromName ? (
                                    <>
                                        <Heading
                                            as="h3"
                                            fontSize="23px"
                                            textAlign="left"
                                        >以下のチームに加入します。よろしいですか？</Heading>
                                        <Text py={10} fontWeight="bold">チーム名: {dataOneTeamFromName.teamFromName.name}</Text>
                                        <Button bg="blue.500" px={5} color="white"  onClick={() => {
                                            joinTeam(dataOneTeamFromName.teamFromName.id)
                                            onCloseTeamAuthModal()
                                        }}>加入する</Button>
                                    </>
                                ):(
                                    <Heading
                                        as="h3"
                                        fontSize="23px"
                                        textAlign="left"
                                        color="red.600"
                                    >
                                        チーム名もしくはパスワードが間違っています。
                                    </Heading>
                                )}
                                </ModalBody>
                                <ModalFooter px={4}>
                                    <SecondaryButton onClick={onCloseIsSearch}>戻る</SecondaryButton>
                                </ModalFooter>
                            </>
                        ): (
                            <>
                                <ModalBody pb={6}>
                                    <Formik
                                        initialErrors={{ name: "required", password: "required" }}
                                        initialValues={{ name: "", password: "0000" }}
                                        onSubmit={(values) => {
                                            if (isJoin) {
                                                searchTeam(values.name, values.password)
                                                setIsSearch(true)
                                            } else {
                                                createTeam(values.name, isAnyoneJoin, values.password)
                                        }}}
                                        validationSchema={object().shape({
                                            name: string().required("一文字以上入力してください。"),
                                            password: string().required("パスワードは必須です。").matches(/^[0-9]{4}$/, "4桁の数字を入力してください。")
                                        })}
                                    >
                                        {({
                                            handleSubmit,
                                            handleChange,
                                            handleBlur,
                                            values,
                                            errors,
                                            touched,
                                            isValid,
                                        }) => (
                                            <form onSubmit={handleSubmit}>
                                                <Stack spacing={4}>
                                                    <CustomForm name="name" type="text" handleChange={handleChange} handleBlur={handleBlur} value={values.name} placeholder="〇〇チーム" >
                                                        チーム名
                                                    </CustomForm> 
                                                    {touched.name && errors.name && (
                                                        <ErrorText>{errors.name}</ErrorText>
                                                    )}
                                                    <Checkbox isChecked={!isAnyoneJoin} onChange={onChangeIsAnyoneJoin}>{isJoin? "パスワードが必要なため入力する" : "パスワードを設定し、参加を制限する"}</Checkbox>
                                                    {!isAnyoneJoin && (
                                                        <>
                                                        <CustomForm name="password" type="text" handleChange={handleChange} handleBlur={handleBlur} value={values.password} placeholder="0000" >
                                                        パスワード
                                                        </CustomForm> 
                                                        {touched.password && errors.password && (
                                                            <ErrorText>{errors.password}</ErrorText>
                                                        )}
                                                        </>
                                                    )}
                                                    <Box textAlign="center">
                                                        <PrimaryButton
                                                            disabled={!isValid}
                                                        >
                                                            {isJoin ? 'チームに加入する' : 'チームを作成する'}
                                                        </PrimaryButton>
                                                    </Box>
                                                </Stack>
                                            </form>
                                        )}
                                    </Formik>
                                </ModalBody>
                                <ModalFooter px={4} justifyContent="space-between">
                                    <Link verticalAlign="middle" onClick={onClickChangeMode} opacity="0.5">{isJoin ? 'チームを作成する場合はこちら' : '既にあるチームに参加する場合はこちら'}</Link>
                                    <SecondaryButton onClick={onCloseTeamAuthModal}>スキップ</SecondaryButton>
                                </ModalFooter>
                            </>
                        )}
                </ModalContent>
            </Modal>
        </>
    )
})
