import {Container, Box, Heading, HStack, Image, Spacer, Flex, VStack, Text} from '@chakra-ui/react'
import {BiUserCircle} from 'react-icons/bi'
import ReactMarkDown from 'react-markdown'

export interface NewsItemProps {
    header:         string
    from:           string
    date:           string
    message:        string
    imageSrc?:      string
}

export const NewsItem = (props: NewsItemProps) => {

    const UserIcon = () => {
        if (props.imageSrc) {
            return (
                <Image
                    borderRadius="20px"
                    boxSize="40px"
                    src={props.imageSrc}
                />
            )
        } else return (
            <BiUserCircle
                size="40px"
            />
        )
    }

    return (
        <Box maxH="lg" w="lg">
            <Flex>
            <Box padding="5" maxH="0.5">
                <HStack>
                    <UserIcon/>
                </HStack>
            </Box>
            <Box p={3}/>
            <Box h="auto" w="auto">
                <VStack align="" spacing="1px">
                        <Text as="b">
                            {props.header}
                        </Text>
                        <Text>
                            от {props.from} - {props.date}
                        </Text>
                        <Box pr={2} pb={2}>
                            <Box 
                                bg="gray.200" 
                                boxSizing="border-box" 
                                width="auto"
                                opacity="initial"
                                borderRadius="5px"
                            >
                                <Flex direction="row">
                                    <Box p={2}>
                                    </Box>
                                    <ReactMarkDown>
                                        {props.message}
                                    </ReactMarkDown>
                                </Flex>
                            </Box>
                        </Box>
                </VStack>
            </Box>
            </Flex>
        </Box>

    )
}

const ItemPreview = () => {
    return (
        <NewsItem
        header="mock_header"
        from="mock_from"
        date="mock_date"
        message="mock_message"
        />
    )
}