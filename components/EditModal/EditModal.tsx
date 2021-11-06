import { 
    useDisclosure,
    Box,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter
} from '@chakra-ui/react'
import React, { MouseEventHandler, useEffect } from 'react'
export type CloseFunc = () => void

export interface OpenButton extends JSX.Element {
    props: {
        onClick?: any
    }
}

export interface EditModalProps {
    // some clickable node that will open modal
    openBtn: (onClick) => JSX.Element

    bodyChilds: JSX.Element

    footerChilds: ({onClose}: Closer) => JSX.Element

    header: string
    size?: string
}

export type Closer = {
    onClose: ()=>void
}

export const EditModal = (props: EditModalProps) => {
    const {isOpen, onOpen, onClose} = useDisclosure()


    const onClick = () => {
        onOpen()
    }

    return (
        <Box>
            {props.openBtn({onClick})}
            <Modal 
            isOpen={isOpen} 
            onClose={onClose}
            size={props.size}
            closeOnEsc
            >
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        {props.header}
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {props.bodyChilds}
                    </ModalBody>
                    <ModalFooter>
                        {props.footerChilds({onClose})}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )

}