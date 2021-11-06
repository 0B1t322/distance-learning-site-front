import { Flex, Box, Link, Spinner, Heading, Spacer, Text } from '@chakra-ui/react'
import { AuthForm } from '../components/auth'
import {Header} from '../components/Header/Header'
import { HomePage } from './HomePage'
import {getNews} from './api'
import { useEffect, useState } from 'react'
import { NewsItemProps } from '../components/News/NewsItem'
import { NewsList } from '../components/News/NewsList'
import { useRouter } from 'next/router'
import {LocalizationProvider} from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import StaticDatePicker from '@mui/lab/StaticDatePicker'
const IndexPage = () => {
    const [news, setNews] = useState<NewsItemProps[]>(null)
    useEffect(
        () => {
            setNews(getNews())
        },
        []
    )

    const News = () => {
        if (news != null) {
            return <NewsList items={news}/>
        } else {
            return <Spinner/>
        }
    }

    return (
        <Box h="100%">
            <Flex direction="row">
                <Box 
                    border="1px"
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="gray.200"
                    p={1}
                    w="full"
                >
                    <Heading p={1} align="center">Доска объявлений</Heading>
                    <Box alignItems="left">
                        <News/>
                    </Box>
                </Box>
                <Box>
                    <AuthForm/>
                </Box>
                <Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default IndexPage
