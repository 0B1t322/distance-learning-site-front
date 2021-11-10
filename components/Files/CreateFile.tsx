import { Closer, EditModal } from "../EditModal/EditModal"

import {
    Button,
    HStack,
    VStack,
    Box,
    Input
} from '@chakra-ui/react'
import FileUploader from "./FileUploader"
import React, { Dispatch, SetStateAction, useState } from "react"
import { filesApi } from "../../pages/api/files"
import { courseAPI } from "../../pages/api/course"
import { baseURL } from "../../pages/api/api"

export interface CreateFileProps{
    topicID: number
    updater: Dispatch<SetStateAction<boolean>>
}

const CreateFile = (props: CreateFileProps) => {
    const [fileName, setFileName] = useState('')
    const openBtn = ({onClick}) => {
        return (
            <Button
            onClick={
                ()=>(
                    onClick()
                )
            }
            colorScheme="green"
            >
                Добавить файл
            </Button>
        )
    }

    const saveFile = (file: File) => {
        console.log(file)
        async function upload() {
            let data = await filesApi.uploadFile(file)
            console.log(data)
            return data
        }
        if (file != null) {
            console.log("upload file")
            upload().then(
                (data) => {
                    courseAPI.createTopicFile(
                        props.topicID,
                        {
                            file_url: baseURL + `/api/mfs/download/${data.id}`,
                            name: fileName != '' ? fileName : file.name
                        }
                    ).then(
                        () => {
                            setFileName('')
                            props.updater(true)
                        }
                    )
                }
            )
        }
    }

    const InputFile = () => {
        return (
            <Box>
                <FileUploader
                saveFile={
                    (file) => {
                        saveFile(file)
                    }
                }
                >
                    <Input 
                    maxW="25%"
                    placeholder="Название файла"
                    value={fileName}
                    onChange={
                        (e) => {
                            setFileName(e.target.value)
                        }
                    }
                    >
                    </Input>
                </FileUploader>
            </Box>
        )
    }

    const Footer = () => {
        return (
            <HStack>
            </HStack>
        )
    }

    return (
        <EditModal
            size="6xl"
            openBtn={openBtn}
            bodyChilds={InputFile()}
            header={`Добавление файла`}
            footerChilds={
                (onClose) => Footer()
            }
        />
    )
}

export default CreateFile