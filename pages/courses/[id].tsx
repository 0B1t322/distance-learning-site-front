import { GetStaticPaths, GetStaticProps } from "next"
import { Course, File } from "../../interfaces"
import { courseAPI } from "../api/course"
import {Text, Spinner, Box, Flex, Heading, VStack, Accordion, HStack, Spacer} from '@chakra-ui/react'
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { CourseUsers } from "../../components/Course/CourseUsers"
import { CourseTopic } from "../../components/Course/CourseTopic"
import { File as CourseFile } from "../../components/Course/File"
import { WaitLoad } from "../../components/waitload"
import { useSelector } from "react-redux"
import { AppStateType } from "../redux/store"
import { EditTopic } from "../../components/Course/EditTopic"
import { EditCourse } from "../../components/Course/EditCourse"
import {EditFile} from '../../components/Files/EditFile'

const CourseDetail = () => {
    const router = useRouter()
    const [course, setCourse] = useState<Course>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [indexes, setIndexes] = useState([])


    const isTeacher = useSelector((state:AppStateType) => state.auth.isTeacher)

    async function getCourse(id: string) {
        let data = await courseAPI.getCourse(id)
        setCourse(data)
        let newIndexes = []
        for (let i = 0; i < data.topics?.length; i+=1) {
            newIndexes.push(i)
        }
        setIndexes(newIndexes)
        setIsLoading(false)
    }

    useEffect(
        () => {
            let id = router.query?.id
            console.log("id", id)
            if (id !== undefined && isLoading) {
                console.log("real not undefined bro")
                getCourse(String(id))
            }
        },[router.query?.id, isLoading])

    const RenderFiles = (file: File) => {
        return (
            <HStack>
                <CourseFile 
                id={file.id}
                name={file.name}
                fileUrl={file.fileUrl}
                />
                <Spacer/>
                <EditFile
                fileID={file.id}
                name={file.name}
                fileUrl={file.fileUrl}
                updater={setIsLoading}
                />
            </HStack>
        )
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
                        <WaitLoad isLoading={isLoading}>
                            <Box>
                            <HStack justifyContent="center">
                                <Text>
                                    {course?.courseName}
                                </Text>
                                <EditCourse
                                    id={course?.id}
                                    name={course?.courseName}
                                    updater={setIsLoading}
                                />
                            </HStack>
                            </Box>
                        </WaitLoad>
                    </Heading>
                    <Box alignItems="left">
                        <Accordion allowToggle allowMultiple defaultIndex={indexes}>
                        {
                            course?.topics?.map(
                                (topic, index) => {
                                    indexes.push(index)
                                    return (
                                        <HStack w="full" align="flex-start">
                                            <Box w="full">
                                            <CourseTopic
                                            id={topic.id}
                                            name={topic.name}
                                            >
                                                <VStack align="left">
                                                    {
                                                        topic.files?.map(
                                                            (file) => RenderFiles(file)
                                                        )
                                                    }
                                                </VStack>
                                            </CourseTopic>
                                            </Box>
                                            {isTeacher ? (<EditTopic id={topic.id} name={topic.name} updater={setIsLoading}/>) : (<></>)}
                                        </HStack>
                                )
                                }
                            )
                        }
                        </Accordion>
                    </Box>
                </Box>
                <Box 
                border="1px"
                borderWidth="1px"
                borderRadius="lg"
                borderColor="gray.200"
                p={2}
                >
                    <WaitLoad isLoading={isLoading}>
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

