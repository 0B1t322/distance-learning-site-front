import { Dispatch, SetStateAction, useState } from "react";
import {
    IconButton,
    Button,
    HStack,
    Input
} from '@chakra-ui/react'

import {
    AiOutlineEdit
} from 'react-icons/ai'
import { Closer, EditModal } from "../EditModal/EditModal";
import { courseAPI } from "../../pages/api/course";
import { useRouter } from "next/router";
import { CreateCourseTopic } from "./CreateCourseTopic";

export interface EditCourseProps {
    id: number
    name: string
    updater: Dispatch<SetStateAction<boolean>>
}

export const EditCourse = (props: EditCourseProps) => {
    const [name, setName] = useState('')
    const router = useRouter()
    const openBtn = ({onClick}) => {
        return (
            <IconButton
            onClick={()=>onClick()}
            icon={<AiOutlineEdit/>}
            aria-label="Update course"
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
            placeholder="Новое имя курса"
            >
            </Input>
        )
    }

    const Footer = ({onClose}: Closer) => {
        return (
            <HStack>
                <Button
                colorScheme="green"
                onClick={
                    ()=>{makeUpdate(onClose)}
                }
                >
                    Применить изменения
                </Button>
                <Button
                colorScheme="red"
                onClick={
                    ()=>{
                        makeDelete(onClose)
                    }
                }
                >
                    Удалить курс
                </Button>
                <CreateCourseTopic
                courseID={props.id}
                updater={props.updater}
                />
            </HStack>

        )
    }

    const makeDelete = (onClose: ()=>void) => {
        async function deleteCourse() {
            let data = await courseAPI.deleteCourse(
                props.id,
            )
            if (data.status != 200) {
                console.log(data.status)
                console.log(data.message)
            }
        }
        deleteCourse()

        setTimeout(
            ()=>{router.push('/my')},
            50,
        )
        onClose()
    }

    const makeUpdate = (onClose: ()=>void) => {
        async function updateCourse() {
            let data = await courseAPI.updateCourse(
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
            updateCourse()
            props.updater(true)
            setName('')
        }
        onClose()
    }


    return (
        <EditModal
        size="6xl"
        openBtn={openBtn}
        bodyChilds={InputNewName()}
        header={`Изменение курса ${props.name}`}
        footerChilds={Footer}
        />
    )

}