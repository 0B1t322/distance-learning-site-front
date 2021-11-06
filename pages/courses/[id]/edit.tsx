
import {Text} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { Course, File } from "../../../interfaces"
import { useEffect, useState } from "react"
import { WaitLoad } from "../../../components/waitload"
import { courseAPI } from '../../api/course'
const EditPage = () => {
    const router = useRouter()
    const [course, setCourse] = useState<Course>(null)
    const [isLoading, setIsLoading] = useState(true)

    async function getCourse(id: string) {
        let data = await courseAPI.getCourse(id)
        setCourse(data)
        setIsLoading(false)
    }

    useEffect(
        () => {
            let id = router.query?.id
            console.log("id", id)
            if (id !== undefined && isLoading) {
                getCourse(String(id))
            }
        },[isLoading, router.query?.id])

    return (
        <Text>
            {router.query?.id}
        </Text>
    )
}

export default EditPage