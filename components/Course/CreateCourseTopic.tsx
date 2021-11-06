import React, { Dispatch, SetStateAction, useState } from "react";
import {
    Button,
    Input
} from '@chakra-ui/react'

import { Closer, EditModal } from "../EditModal/EditModal";
export interface CreateCourseTopicProps {
    courseID:   number
    updater:    Dispatch<SetStateAction<boolean>>
}

export const CreateCourseTopic = (props: CreateCourseTopicProps) => {
    const [name, setName] = useState('')
    
    const openBtn = ({onClick}) => {
        return (
            <Button
            colorScheme="green"
            >
                Создать топик
            </Button>
        )
    }

    const Footer = ({onClose}: Closer) => {
        return (
            <Button>
                Добавить
            </Button>
        )
    }

    const NameInput = () => {
        return (
            <Input
            value={name}
            onChange={
                (event) => setName(event.target.value)
            }
            placeholder="Новое имя курса"
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