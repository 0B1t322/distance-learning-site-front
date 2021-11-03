import { NewsItem, NewsItemProps } from "./NewsItem"
import {Flex, Box, VStack} from '@chakra-ui/react'

type ListProps = {
    items: NewsItemProps[]
}

export const NewsList = ({items}: ListProps) => {
    return (
        <VStack spacing="5" p={1}>
            {
                items.map(
                    (item) => {
                        return (
                            <Box borderWidth="1px" borderRadius="lg">
                                {NewsItem(item)}
                            </Box>
                        )
                    }
                )
            }
        </VStack>
    )
}