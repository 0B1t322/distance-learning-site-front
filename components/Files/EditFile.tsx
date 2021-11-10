import { Dispatch, SetStateAction } from "react";

import {
    IconButton,
    Button
} from '@chakra-ui/react'

import {
    AiOutlineEdit
} from 'react-icons/ai'
import { Closer, EditModal } from "../EditModal/EditModal";
import { filesApi } from "../../pages/api/files";
import { courseAPI } from "../../pages/api/course";

type Props = {
    fileID: number
    // look like https://domain/api/mfs/download/:id
    fileUrl: string
    name: string
    updater: Dispatch<SetStateAction<boolean>>
}

export const EditFile = (props: Props) => {

    const openBtn = ({onClick}) => {
        return (
            <IconButton
            onClick={()=>onClick()}
            icon={<AiOutlineEdit/>}
            aria-label="Update file"
            />
        )
    }

    const makeDelete= (onClose: ()=>void) => {
        const mfsFileId = props.fileUrl.split('/').pop()
        filesApi.deleteFile(mfsFileId).then(
            (data) => {
                console.log(data.status)
                courseAPI.deleteTopicFile(
                    props.fileID,
                ).then(
                    (data) => {
                        console.log(data.status)
                        onClose()
                        props.updater(true)
                    }
                )
            }
        )
    }
    
    const Footer = ({onClose}: Closer) => {
        return (
            <Button
            colorScheme="red"
            onClick={
                ()=>makeDelete(onClose)
            }
            >
                Удалить файл
            </Button>
        )
    }

    return (
        <EditModal
        openBtn={openBtn}
        bodyChilds={(<></>)}
        header={`Изменение файла ${props.name}`}
        footerChilds={
            (onClose) => Footer(onClose)
        }
        />
    )
}

export default EditFile