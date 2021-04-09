import React, { memo, VFC } from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/modal'
import { Link, Stack } from '@chakra-ui/layout'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Formik } from 'formik'
import { object, string } from 'yup'
import { Button } from '@chakra-ui/button'
import { useUser } from '../../../hooks/useUser'
import { useRecoilState } from 'recoil'
import { userAuthModalState } from '../../../store/userAuthModalState'

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
            <ModalContent>
                <ModalHeader textAlign="center">{isLogin ? 'ログイン' : 'ユーザー作成'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                    <Formik
                        initialErrors={{ email: "required" }}
                        initialValues={{ nickname: "名無し", email: "", password: "", password_confirmation: "" }}
                        onSubmit={async (values) => {
                            loginOrSignup(values)
                        }}
                        validationSchema={object().shape({
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
                                        <FormControl id="nickname">
                                            <FormLabel>ニックネーム</FormLabel>
                                            <Input name="nickname" onChange={handleChange} onBlur={handleBlur} value={values.nickname} />
                                        </FormControl>
                                    )}
                                    <FormControl id="email">
                                        <FormLabel>Eメール</FormLabel>
                                        <Input name="email" type="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                                    </FormControl>
                                    {touched.email && errors.email ? (
                                        <div>{errors.email}</div>
                                    ): null}
                                    <FormControl id="password">
                                        <FormLabel>パスワード</FormLabel>
                                        <Input name="password" type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                    </FormControl>
                                    {touched.password && errors.password ? (
                                        <div>{errors.password}</div>
                                    ): null}
                                    {!isLogin && (
                                    <FormControl id="password_confirmation">
                                        <FormLabel>パスワード(確認用)</FormLabel>
                                        <Input name="password_confirmation" type="password" onChange={handleChange} onBlur={handleBlur} value={values.password_confirmation} />
                                    </FormControl>
                                    )}
                                    <Button
                                        variant="contained"
                                        disabled={!isValid}
                                        type="submit"
                                    >{isLogin ? 'ログイン' : "ユーザー登録"}</Button>
                                </Stack>
                            </form>
                        )}
                    </Formik>
                </ModalBody>
                <ModalFooter px={4} justifyContent="space-between">
                    <Link verticalAlign="middle" onClick={onClickChangeMode}>{isLogin ? 'アカウントを持っていない場合はこちら': '既にアカウントを持っている場合はこちら'}</Link>
                    <Button onClick={onCloseUserAuthModal}>閉じる</Button>                      
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
})

