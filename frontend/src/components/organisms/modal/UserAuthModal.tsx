import { memo, useCallback, useState, VFC } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Box, Link, Stack } from '@chakra-ui/layout'
import { Formik } from 'formik'
import { object, string } from 'yup'

import { CustomForm } from '../../molecules/CustomForm'
import { ErrorText } from '../../atoms/text/ErrorText'
import { SecondaryButton } from '../../atoms/button/SecondaryButton'
import { PrimaryButton } from '../../atoms/button/PrimaryButton'
import { useUserAuth } from '../../../hooks/useUserAuth'
import { useControllModal } from '../../../hooks/useControllModal'

export const UserAuthModal: VFC = memo(() => {
    const [isLogin, setIsLogin] = useState(true)

    const { userAuthModal, onCloseUserAuthModal } = useControllModal()
    const { signup, login } = useUserAuth()

    const onClickChangeMode = useCallback(() => setIsLogin(!isLogin), [isLogin])

    return (
        <Modal
            closeOnOverlayClick={false}
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
                        onSubmit={(values) => {
                            isLogin ? login(values.email, values.password) : signup(values)
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
                                        <CustomForm name="nickname" type="text" handleChange={handleChange} handleBlur={handleBlur} value={values.nickname} placeholder="トレーニング太郎" >
                                            ニックネーム
                                        </CustomForm>
                                    )}
                                    {touched.nickname && errors.nickname && (
                                        <ErrorText>{errors.nickname}</ErrorText>
                                    )}
                                    <CustomForm name="email" type="email" handleChange={handleChange} handleBlur={handleBlur} value={values.email} placeholder="training@example.com">
                                        Eメール
                                    </CustomForm>
                                    {touched.email && errors.email && (
                                        <ErrorText>{errors.email}</ErrorText>
                                    )}
                                    <CustomForm name="password" type="password" handleChange={handleChange} handleBlur={handleBlur} value={values.password} placeholder="">
                                        パスワード
                                    </CustomForm>
                                    {touched.password && errors.password && (
                                        <ErrorText>{errors.password}</ErrorText>
                                    )}
                                    {!isLogin && (
                                        <CustomForm name="password_confirmation" type="password" handleChange={handleChange} handleBlur={handleBlur} value={values.password_confirmation} placeholder="">
                                            パスワード
                                        </CustomForm>
                                    )}
                                    <Box textAlign="center">
                                        <PrimaryButton
                                            disabled={!isValid}
                                        >
                                            {isLogin ? 'ログイン' : "ユーザー登録"}
                                        </PrimaryButton>
                                    </Box>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter px={4} justifyContent="space-between">
                    <Link verticalAlign="middle" onClick={onClickChangeMode} opacity="0.7">
                        {isLogin ? 'アカウントを持っていない場合はこちら': '既にアカウントを持っている場合はこちら'}
                    </Link>
                    <SecondaryButton onClick={onCloseUserAuthModal}>閉じる</SecondaryButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

