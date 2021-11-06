import {Box, Text, AccordionButton, AccordionItem, AccordionPanel, Spacer} from '@chakra-ui/react'
import {ChevronDownIcon, ChevronUpIcon} from '@chakra-ui/icons'
import { useSelector } from 'react-redux'
import { AppStateType } from '../../pages/redux/store'
import { EditTopic } from './EditTopic'
export interface CourseTopicProps {
    id: number
    name: string
    children?
}

export const CourseTopic = (props: CourseTopicProps) => {
    const isTeacher = useSelector((state:AppStateType) => state.auth.isTeacher)
    return (
        <AccordionItem>
            {
                ({isExpanded}) => (
                    <>
                        <h2>
                            <AccordionButton bg="gray.50">
                                <Box>
                                    <Box flex="1" textAlign="left">
                                        <Text>
                                            {props.name}
                                        </Text>
                                    </Box>
                                </Box>
                                <Spacer/>
                                {isExpanded ? (<ChevronUpIcon/>): (<ChevronDownIcon/>)}
                            </AccordionButton>
                        </h2>
                        <AccordionPanel p={4}>
                            {props.children}
                        </AccordionPanel>
                    </>
                )
            }
        </AccordionItem>
    )
}