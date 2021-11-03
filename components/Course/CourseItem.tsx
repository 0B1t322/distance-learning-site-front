import { Box, VStack, Text, Spacer, Link } from "@chakra-ui/layout"
import { useRouter } from "next/router"
import { useEffect } from "react"
import NextLink from 'next/link'

export interface CourseItemProps {
    id:     number
    name:   string
}

export const CourseItem = (props: CourseItemProps) => {
    const router = useRouter()
    const colors = ["red.100", "orange.200", "yellow.200", "green.200", "yellow.800", "teal.200"]

    const getRandomColor = (name: string): string => {
        return colors[name.charCodeAt(0) % colors.length]
    }

    return (
        <Link>
        <NextLink href={`/courses/${props.id}`}>
            <Box m="6px">
                <VStack spacing={0} height="100%">
                    <Box bg={getRandomColor(props.name)} minW="100%" minH="100px" borderRadius="inherit" borderWidth="1px">
                        <Spacer/>
                    </Box>
                    <Box minHeight="20px">
                        <Spacer/>
                    </Box>
                    <Box bg="white">
                        <Text>
                            {props.name}
                        </Text>
                    </Box>
                    <Box minHeight="10px">
                        <Spacer/>
                    </Box>
                </VStack>
            </Box>
            </NextLink>
        </Link>
    )
}