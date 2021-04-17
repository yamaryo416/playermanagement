import React, { memo, VFC } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Box, Link, Stack } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Button } from '@chakra-ui/button'
import { useUser } from '../../../hooks/useUser'
import { useRecoilState } from 'recoil'
import { userAuthModalState } from '../../../store/userAuthModalState'
import { UserAuthForm } from '../../molecules/UserAuthForm'
import { ErrorText } from '../../atoms/text/ErrorText'
import { SecondaryButton } from '../../atoms/button/SecondaryButton'

export const UserAuthModal: VFC= memo(() => {

    const { isLogin, onClickChangeMode, loginOrSignup } = useUser();

    const [userAuthModal, setUserAuthModal] = useRecoilState(userAuthModalState)

    const onCloseUserAuthModal = () => setUserAuthModal(false)

    return (
        <Modal
            isOpen={userAuthModal}
            onClose={onCloseUserAuthModal}
            autoFocus={false}
        >
            <ModalOverlay/>
            <ModalContent color="black">
                <ModalHeader textAlign="center" fontSize="25px" >
                    {isLogin ? 'ログイン' : 'ユーザー作成'}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Formik
                        initialErrors={{ email: "required" }}
                        initialValues={{ nickname: "名無し", email: "", password: "", password_confirmation: "" }}
                        onSubmit={async (values) => {
                            loginOrSignup(values)
                        }}
                        validationSchema={object().shape({
                            nickname: string().required("1文字以上入力してください。"),
                            email: string().email("正しいEmailを入力してください。").required("Emailは必須です。"),
                            password: string().required("パスワードは必須です。").min(6, "パスワードは6文字以上で入力してください"),
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
                                    {!isLogin && (
                                        <UserAuthForm name="nickname" type="text" handleChange={handleChange} handleBlur={handleBlur} value={values.nickname}>
                                            ニックネーム
                                        </UserAuthForm>
                                    )}
                                    {touched.nickname && errors.nickname ? (
                                        <ErrorText>{errors.nickname}</ErrorText>
                                    ): null}
                                    <UserAuthForm name="email" type="email" handleChange={handleChange} handleBlur={handleBlur} value={values.email}>
                                        Eメール
                                    </UserAuthForm>
                                    {touched.email && errors.email ? (
                                        <ErrorText>{errors.email}</ErrorText>
                                    ): null}
                                    <UserAuthForm name="password" type="password" handleChange={handleChange} handleBlur={handleBlur} value={values.password}>
                                        パスワード
                                    </UserAuthForm>
                                    {touched.password && errors.password ? (
                                        <ErrorText>{errors.password}</ErrorText>
                                    ): null}
                                    {!isLogin && (
                                        <UserAuthForm name="password_confirmation" type="password" handleChange={handleChange} handleBlur={handleBlur} value={values.password_confirmation}>
                                            パスワード
                                        </UserAuthForm>
                                    )}
                                    <Box textAlign="center">
                                        <Button
                                            disabled={!isValid}
                                            type="submit"
                                            bg="blue.500"
                                            px={5}
                                            color="white"
                                        >{isLogin ? 'ログイン' : "ユーザー登録"}</Button>
                                    </Box>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter px={4} justifyContent="space-between">
                    <Link verticalAlign="middle" onClick={onClickChangeMode}>{isLogin ? 'アカウントを持っていない場合はこちら': '既にアカウントを持っている場合はこちら'}</Link>
                    <SecondaryButton onClick={onCloseUserAuthModal}>閉じる</SecondaryButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

