import {HStack, Image, Box, Text, Link, Avatar, Spacer, Button, Spinner} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from "../../pages/redux/store"
import headerStyles from "./Header.module.css"
import jwt_decode from 'jwt-decode'
import {authActions} from '../../pages/redux/store/auth-reducer'
import { useEffect, useState } from 'react'
import { User } from '../../interfaces'
import { authAPI } from '../../pages/api/auth'

export type TokenHeaders = {
    user_id: number
}

export const Header = () => {
    const isUSerLogin = useSelector((state:AppStateType) => state.auth.isLogin)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState<User>(null)

    function href(): string  {
        return isUSerLogin ? '/my' : '/'
    }

    useEffect(
        () => {
            const token = localStorage.getItem('accessToken')
            const decoded = jwt_decode<TokenHeaders>(token)
            async function getUser() {
                setIsLoading(true)
                console.log('user id',decoded.user_id)
                let data = await authAPI.getUser(decoded.user_id)
                setUser(data)
                setIsLoading(false)
            }
            getUser()
        }, [isUSerLogin],
    )


    const UserInfo = () => {
        return (
            <WaitLoad>
                <HStack>
                    <Avatar name={`${user?.firstName} ${user?.secondName}`}>
                    </Avatar>
                    <Text>
                        Вы зашли под {`${user?.firstName} ${user?.secondName}`}
                    </Text>
                </HStack>
            </WaitLoad>
        )
    }

    const WaitLoad = (
        {children}
    ) => {
        if(isLoading) {
            return (
                <Spinner/>
            )
        } else {
            return children
        }
    }
    
    const Unlogin = () => {
        dispatch(authActions.logout())
    }

    return (
        <div className={headerStyles.mobileNav}>
        <Box bg="telegram.500">
            <Box p={1}>
                <HStack>
                    <Image 
                        src="https://online-edu.mirea.ru/pluginfile.php?file=%2F1%2Fcore_admin%2Flogocompact%2F300x300%2F1635634741%2FMIREA_Gerb_Colour.png"
                        objectFit="cover"
                        boxSize="40px"
                    />
                    <Link href={href()}>
                        <Text fontSize="md" as="samp">Сайт дистационного обучения РТУ МИРЭА</Text>
                    </Link>
                    <Spacer/>
                    {
                        isUSerLogin ? (
                            <HStack>
                                <UserInfo/>
                                <Button onClick={Unlogin}>
                                    Выход
                                </Button>
                            </HStack>
                        ) : (<></>)
                    }
                </HStack>
            </Box>
        </Box>
        </div>
    )
}