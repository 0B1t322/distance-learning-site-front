
import {
    IconButton,
    Button,
    HStack
} from '@chakra-ui/react'
import { Dispatch, SetStateAction, useState } from 'react'

import {
    AiOutlineEdit
} from 'react-icons/ai'

import {
    EditModal,
    CloseFunc,
    OpenButton,
    Closer,
} from '../EditModal/EditModal'

import CreateFile from '../Files/CreateFile'

import { MouseEventHandler, useEffect } from 'react'
import {Box, Input} from '@chakra-ui/react'
import { courseAPI } from '../../pages/api/course'
export interface EditTopicProps {
    id: number
    name: string
    updater: Dispatch<SetStateAction<boolean>>
}

// open modal view for editing topic
export const EditTopic = (props: EditTopicProps) => {
    const [name, setName] = useState('')

    const openBtn = ({onClick}) => {
        return (
            <IconButton
            onClick={()=>(onClick())}
            icon={<AiOutlineEdit/>}
            aria-label="Update topic"
            />
        )
    }

    const InputNewName = () => {
        return (
            <Input
            value={name}
            onChange={
                (event) => setName(event.target.value)
            }
            placeholder="Новое имя топика"
            >
            </Input>
        )
    }

    const Footer = ({onClose}: Closer) => {
        return (
            <HStack>
                <Button
                onClick={
                    () => {
                        makeUpdate(onClose)
                    }
                }
                colorScheme="green"
                >
                    Применить изменения
                </Button>
                <Button
                colorScheme="red"
                onClick={
                    () => {
                        makeDelete(onClose)
                    }
                }
                >
                    Удалить топик
                </Button>
                <CreateFile
                topicID={props.id}
                updater={props.updater}
                />
            </HStack>
        )
    }

    const makeUpdate = (onClose: ()=>void) => {
        async function updateTopic() {
            let data = await courseAPI.updateCourseTopic(
                props.id,
                {
                    name: name,
                },
            )
            if (data.status != 200) {
                console.log(data.status)
                console.log(data.message)
            }
        }
        if (name != '') {
            updateTopic()
            props.updater(true)
            setName('')
        }
        onClose()
    }

    const makeDelete = (onClose: ()=>void) => {
        async function deleteTopic() {
            let data = await courseAPI.deleteCourseTopic(
                props.id
            )
            if (data.status != 200) {
                console.log(data.status)
                console.log(data.message)
            }
        }
        deleteTopic().then(
            () =>{
                props.updater(true)
                onClose()
            }
        )
    }


    return (
            <EditModal
            size="xl"
            openBtn={openBtn}
            bodyChilds={InputNewName()}
            header={`Изменение топика ${props.name}`}
            footerChilds={
                (onClose) => Footer(onClose)
            }
            />
    )
}