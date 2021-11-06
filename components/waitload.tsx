
import {Spinner} from '@chakra-ui/react'

interface WaitLoadProps {
    isLoading: boolean
    children
}

export const WaitLoad = (
    props: WaitLoadProps
) => {
    if(props.isLoading) {
        return (
            <Spinner/>
        )
    } else {
        return props.children
    }
}