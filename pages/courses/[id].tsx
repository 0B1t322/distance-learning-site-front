import { GetStaticPaths, GetStaticProps } from "next"
import { Course } from "../../interfaces"
import { courseAPI } from "../api/course"
import {Text, Spinner, Box, Flex, Heading} from '@chakra-ui/react'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CourseUsers } from "../../components/Course/CourseUsers"

const CourseDetail = () => {
    const router = useRouter()
    const [course, setCourse] = useState<Course>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function getCourse(id: string) {
        let data = await courseAPI.getCourse(id)
        setCourse(data)
        setIsLoading(false)
    }

    useEffect(
        () => {
            let id = router.query?.id
            console.log("id", id)
            if (id !== undefined) {
                console.log("real not undefined bro")
                getCourse(String(id))
            }
        },[router.query?.id])

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

    return (
        <Box h="100%">
            <Flex direction="row" gridGap={2} pt={2}>
                <Box 
                    border="1px"
                    borderWidth="1px"
                    borderRadius="lg"
                    borderColor="gray.200"
                    p={1}
                    w="full"
                >
                    <Heading p={1} align="center">
                        <WaitLoad>
                            <Text>
                                {course?.courseName}
                            </Text>
                        </WaitLoad>
                    </Heading>
                    <Box alignItems="left">
                        {/* <WaitLoad>
                            <Text>
                                {course?.courseName}
                            </Text>
                        </WaitLoad> */}
                    </Box>
                </Box>
                <Box 
                border="1px"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
                p={2}
                >
                    <WaitLoad>
                        <CourseUsers 
                            teachers={course?.courseUsers.teachers} 
                            students={course?.courseUsers.students}
                        />
                    </WaitLoad>
                </Box>
            </Flex>
        </Box>
    )
}


export default CourseDetail

