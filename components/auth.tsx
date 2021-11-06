import {
    Input,
    VStack, 
    InputGroup,
    InputRightElement, 
    InputLeftElement, 
    Button, 
    Flex,
    Heading,
    Spacer,
    Box,
    Text,
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    CloseButton
} from '@chakra-ui/react'
import {MdAccountCircle, MdLock} from 'react-icons/md'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from "../pages/redux/store"
import { authActions, login as loginFunc } from '../pages/redux/store/auth-reducer'
import { useRouter } from 'next/router'

export const AuthForm = () => {
    const dispatch = useDispatch()
    let [login, setLogin] = React.useState("")
    let [password, setPassword] = React.useState("")
    const [show, setShow] = React.useState(false)
    const [loginEmpty, setLoginEmpty] = React.useState(false)
    const [pswEmpty, setPswEmpty] = React.useState(false)
    const isUserLogin = useSelector((state:AppStateType) => state.auth.isLogin)
    const isLoginError = useSelector((state:AppStateType) => state.auth.isLoginError)

    const router = useRouter()

    const loginChange = (event: {target: HTMLInputElement}) => {
        setLogin(event.target.value)
        setLoginEmpty(false)
    }

    const passwordChange = (event: {target: HTMLInputElement}) => {
        setPassword(event.target.value)
        setPswEmpty(false)
    }

    const Login = () => {
        dispatch(authActions.setLoginError(false))
        if(login != '' && password != '') {
            dispatch(loginFunc(login, password))
        } else {
            if(login == '') {
                setLoginEmpty(true)
            }
            if(password == '') {
                setPswEmpty(true)
            }
        }
    }

    if(isUserLogin) {
        router.push('/my')
    }

    return (
        <Box p={2} size="md">
            <Box
                border="1px"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
            >
                <Flex direction="column" bg="whiteAlpha.700">
                    <VStack spacing={1}>
                        <Spacer/>
                        <Heading size="sm" mb={6}>
                            Авторизация
                        </Heading>
                        <Box size="md" pl={4} pr={4} pb={4}>
                            <InputGroup size="md" maxW="md">
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdAccountCircle color="gray.300"/>}
                                />
                                <Input
                                    placeholder={loginEmpty ? "Заполните это поле" : "Login"}
                                    value={login}
                                    onChange={loginChange}
                                    borderColor={loginEmpty ? "red.400" : "gray.300"}
                                />
                                <InputRightElement>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                        <Box pl={4} pr={4} pb={4}>
                            <InputGroup size="md" maxW="md">
                                <InputLeftElement
                                    pointerEvents="none"
                                    children={<MdLock color="gray.300"/>}
                                />
                                <Input
                                    placeholder={pswEmpty ? "Заполните это поле" : "Password"}
                                    value={password}
                                    onChange={passwordChange}
                                    type={show ? "text" : "password"}
                                    borderColor={pswEmpty ? "red.400" : "gray.300"}
                                />
                                <InputRightElement>
                                    <Button 
                                        // h="1.75rem"
                                        size="sm"
                                        onClick={()=>setShow(!show)}
                                    >
                                        {show ? <ViewOffIcon color="gray.300"/> : <ViewIcon color="gray.300"/>}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Box>
                        {
                            isLoginError? (
                                <Box 
                                p={1} 
                                maxW="inherit"
                                >
                                    <Alert 
                                    status="error"
                                    border="1px"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    borderColor="gray.200"
                                    >
                                    <AlertIcon/>
                                    <AlertTitle>
                                        Ошибка
                                    </AlertTitle>
                                    <AlertDescription>
                                        Неверный пароль или логин
                                    </AlertDescription>
                                    <CloseButton 
                                    position="absolute" 
                                    right="8px" 
                                    top="8px"
                                    onClick={()=>(dispatch(authActions.setLoginError(false)))}
                                    />
                                </Alert>
                                </Box>
                            ): (<></>)
                        }
                        <Box pb={4}>
                            <Button 
                            bg="Highlight"
                            onClick={Login}
                            >
                                Вход
                            </Button>
                        </Box>
                    </VStack>
                </Flex>
            </Box>
        </Box>
    )
}