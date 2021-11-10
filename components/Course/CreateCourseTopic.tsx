import React, { Dispatch, SetStateAction, useState } from "react";
import {
    Button,
    Input
} from '@chakra-ui/react'

import { Closer, EditModal } from "../EditModal/EditModal";
import { courseAPI } from "../../pages/api/course";
export interface CreateCourseTopicProps {
    courseID:   number
    updater:    Dispatch<SetStateAction<boolean>>
}

export const CreateCourseTopic = (props: CreateCourseTopicProps) => {
    const [name, setName] = useState('')
    
    const openBtn = ({onClick}) => {
        return (
            <Button
            onClick={()=>{onClick()}}
            colorScheme="green"
            >
                Создать топик
            </Button>
        )
    }

    const Footer = ({onClose}: Closer) => {
        return (
            <Button
            onClick={()=>{makeCourseTopic(onClose)}}
            >
                Добавить
            </Button>
        )
    }

    const makeCourseTopic = (onClose: ()=>void) => {
        async function createCourseTopic() {
            let data = await courseAPI.createCourseTopic(
                props.courseID,
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
            createCourseTopic().then(
                () => {
                    onClose()
                    props.updater(true)
                }
            )
        }
    }

    const NameInput = () => {
        return (
            <Input
            value={name}
            onChange={
                (event) => setName(event.target.value)
            }
            placeholder="Имя топика"
            >
            </Input>
        )
    }

    return (
        <EditModal
        size="full"
        openBtn={openBtn}
        bodyChilds={NameInput()}
        header={'Создание топика'}
        footerChilds={Footer}
        />
    )
}