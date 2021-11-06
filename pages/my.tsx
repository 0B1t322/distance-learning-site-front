import { useEffect, useState } from "react"
import { CourseList } from "../components/Course/CourseList"
import { CompactCourse, courseAPI } from "./api/course"
import { 
    Spinner, 
    Box, 
    Flex, 
    Heading, 
    useDisclosure, 
    Button, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    HStack,
    Spacer,
    ModalBody,
    Input,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton,
    ModalFooter
} from "@chakra-ui/react"
import { useSelector } from "react-redux"
import { AppStateType } from "./redux/store"
import { useRouter } from "next/router"
import { StatusCodesEnum } from "./api/api"

const MyPage = () => {
    const router = useRouter()

    const [courses, setCourses] = useState<CompactCourse[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const isTeacher = useSelector((state:AppStateType) => state.auth.isTeacher)
    const {isOpen, onOpen, onClose} = useDisclosure()
    
    const addCourseModalButton = () => {
        const [courseName, setCourseName] = useState('')
        const [empty, setEmpty] = useState(false)

        const CreateCourse = () => {
            if (courseName == '') {
                setEmpty(true)
                return
            }
            async function createCourse() {
                let data = await courseAPI.createCourse(
                    {courseName: courseName}
                )
                setIsLoading(true)
                onClose()
                return data
            }

            createCourse().then(
                (data) => router.push('/courses/' + data.id)
            )
        }

        return (
            <Box p={1}>
                <Button
                onClick={onOpen}
                >
                Создать курс
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay/>
                    <ModalContent>
                        <ModalHeader>
                            Добавление курса
                        </ModalHeader>
                        <ModalCloseButton/>
                        <ModalBody>
                            <Input
                            placeholder="Название курса"
                            value={courseName}
                            onChange={
                                (event: {target: HTMLInputElement}) => 
                                {setCourseName(event.target.value)}
                            }
                            />
                            {
                                empty ? (
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
                                            Название курс не может быть пустым
                                        </AlertDescription>
                                        <CloseButton 
                                        position="absolute" 
                                        right="8px" 
                                        top="8px"
                                        onClick={()=>(setEmpty(false))}
                                        />
                                    </Alert>
                                ): (<></>)
                            }
                        </ModalBody>
                        <ModalFooter>
                            <Button 
                                colorScheme="green"
                                onClick={() => {
                                    CreateCourse()
                                }}
                            >
                                Создать курс
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
        )
    }

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
            if (isLoading) {
                getCourses()
            }
        },[isLoading]
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
            <HStack>
                <Spacer/>
                {
                    isTeacher ? addCourseModalButton() : (<></>)
                }
            </HStack>
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