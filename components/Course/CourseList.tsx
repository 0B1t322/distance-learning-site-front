import { Flex, Box, Spacer, HStack } from "@chakra-ui/react"
import { CourseItem, CourseItemProps } from "./CourseItem"

type CourseListProps = {
    items: CourseItemProps[]
}

export const CourseList = ({items}: CourseListProps) => {
   return (
        <Flex direction="row" flexWrap="wrap"  gridGap={5}>
            {
                items?.map(
                    (item) => {
                        return (
                            <Box>
                                <Box borderWidth="1px" borderRadius="lg" minW="xl" maxW="xl">
                                    {CourseItem(item)}
                                </Box>
                            </Box>
                        )
                    }
                )
            }
        </Flex>
   )
}