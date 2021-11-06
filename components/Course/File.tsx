import { HStack, Text, Link } from "@chakra-ui/layout"
import {AiOutlineFile} from 'react-icons/ai'

export interface FileProps{
    id:         number
    name:       string
    fileUrl:    string
}

export const File = (props: FileProps) => {
    return (
        <Link href={props.fileUrl} isExternal>
        <HStack spacing={5}>
            <AiOutlineFile size="40px"/>
            <Text>
                {props.name}
            </Text>
        </HStack>
        </Link>
    )
}