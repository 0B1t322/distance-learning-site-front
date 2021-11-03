import { useEffect, useState } from "react"
import { CourseList } from "../components/Course/CourseList"
import { CompactCourse, courseAPI } from "./api/course"
import { Spinner, Box, Flex, Heading } from "@chakra-ui/react"

const MyPage = () => {
    const [courses, setCourses] = useState<CompactCourse[]>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        () => {
            async function getCourses() {
                let data = await courseAPI.getCourses()
                console.log('courses', data.courses)
                console.log('code', data.status)
                if (data.status != 200) {
                    console.log('message', data.message)
                }
                setCourses(data.courses)
                setIsLoading(false)
            }
            getCourses()
            

        },[]
    )

    const renderLoadgin = () => {
        if (isLoading) {
            return (
                <Spinner/>
            )
        } else {
            return (
                <CourseList items={courses}/>
            )
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
                    <Heading p={1} align="center">Мои курсы</Heading>
                    <Box alignItems="left">
                        {renderLoadgin()}
                    </Box>
                </Box>
            </Flex>
        </Box>
    )
}

export default MyPage