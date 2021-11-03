
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react"
import {BiUserCircle} from 'react-icons/bi'

export interface UserProps{
    id: number
    firstName: string
    secondName: string
    thirdName: string
}

export interface CourseUserProps {
    id: number
    user: UserProps
}

export interface CourseUsersProps {
    teachers?: CourseUserProps[]
    students?: CourseUserProps[]
}

export const CourseUser = (props: CourseUserProps) => {
    return (
        <Box>
            <HStack spacing={2}>
                <BiUserCircle size="40px"/>
                <Text fontSize="sm" w="100px">
                    {`${props.user.firstName} ${props.user.secondName} ${props.user.thirdName}`}
                </Text>
            </HStack>
        </Box>
    )
}

export const CourseUsers = ({students, teachers}: CourseUsersProps) => {

    const RendetStudents = () => {
        if (students) {
            return (
                <VStack>
                    <Text align="left" as="b">
                        Студент
                    </Text>
                    {students.map(
                        (item) => CourseUser(item)
                    )}
                </VStack>
            )
        } else {
            return (
                <VStack>
                </VStack>
            )
        }
    }

    const RenderTeachers = () => {
        if (teachers) {
            return (
                <VStack>
                    <Text align="left" as="b">
                        Преподаватель
                    </Text>
                    {teachers.map(
                        (item) => CourseUser(item)
                    )}
                </VStack>
            )
        } else {
            return (
                <VStack>
                </VStack>
            )
        }
    }

    return (
        <Box>
            <VStack spacing={4}>
                <Text align="left" alignItems="left">
                    Люди
                </Text>
                {RenderTeachers()}
                {RendetStudents()}
            </VStack>
        </Box>
    )
}