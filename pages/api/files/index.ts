import axios from "axios"
import { baseURL, ErrorResponceType } from "../api"

type UploadFleRespType = {
    id: string
}

export const filesApi = {
    uploadFile(file: File) {
        let formData = new FormData()
        formData.append("uploadingForm", file)
        return axios.post<UploadFleRespType & ErrorResponceType>(
            baseURL + `/api/mfs/files/upload`,
            formData,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    deleteFile(fileId: string) {
        return axios.delete<ErrorResponceType>(
            baseURL + `/api/mfs/files/${fileId}`
        ).then(responce => responce.data)
    }
}