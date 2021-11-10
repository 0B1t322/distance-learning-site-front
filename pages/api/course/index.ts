import axios from "axios"
import { baseURL, ErrorResponceType } from "../api"

export type CompactCourse = {
    id: number
    name: string
}

export type GetCoursesResponceType = {
    courses: CompactCourse[]
}

export type CourseUsersType = {
    students?: StudentType[]
    teachers?: TeacherType[]
}

export type UserType = {
    id: number
    firstName: string
    secondName: string
    thirdName: string
}

export type StudentType = {
    id: number
    gradeBookNumber: string
    studentCard: string
    user: UserType
}

export type TeacherType = {
    id: number
    user: UserType
}

export type CourseTopicType = {
    id:         number
    name:       string
    files?:     FileType[]
}

export type FileType = {
    id:         number
    name:       string
    fileUrl:    string
}

export type GetCourseResponceType = {
    id:             number
    courseName:     string
    courseUsers:    CourseUsersType
    topics?:        CourseTopicType[]
}

type CreateCourseRequestType = {
    courseName: string
}

type CreateCourseResponceType = {
    id: number
}

type UpdateCourseTopicReqType = {
    name: string
}

type UpdateCourseReqType = {
    name: string
}

type CreateCourseTopicReqType = {
    name: string
}

type CreateFileReqType = {
    name: string
    file_url: string
}

export const courseAPI = {
    getCourses() {
        return axios.get<GetCoursesResponceType & ErrorResponceType>(
            baseURL + '/api/site/v1/course?forUser=true',
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`
                }
            }
        ).then(responce => responce.data )
    },
    getCourse(id: string | number) {
        return axios.get<GetCourseResponceType & ErrorResponceType>(
            baseURL + `/api/site/v1/course/` + id,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`
                }
            }
        ).then(responce => responce.data)
    },
    createCourse(req: CreateCourseRequestType) {
        return axios.post<CreateCourseResponceType & ErrorResponceType>(
            baseURL + `/api/site/v1/course`,
            req,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    updateCourseTopic(id: number|string, req: UpdateCourseTopicReqType) {
        return axios.put<ErrorResponceType>(
            baseURL + `/api/site/v1/topic/` + id,
            req,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    deleteCourseTopic(id: number | string) {
        return axios.delete<ErrorResponceType>(
            baseURL + `/api/site/v1/topic/` + id,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    updateCourse(id: number | string, req: UpdateCourseReqType) {
        return axios.put<ErrorResponceType>(
            baseURL + `/api/site/v1/course/` + id,
            req,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    deleteCourse(id: number | string) {
        return axios.delete<ErrorResponceType>(
            baseURL + `/api/site/v1/course/` + id,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    createCourseTopic(courseId: number | string, req: CreateCourseTopicReqType) {
        return axios.post<ErrorResponceType>(
            baseURL + `/api/site/v1/course/${courseId}/topic`,
            req,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    createTopicFile(topicId: number | string, req: CreateFileReqType) {
        return axios.post<ErrorResponceType>(
            baseURL + `/api/site/v1/topic/${topicId}/file`,
            req,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    },
    deleteTopicFile(fileId: string | number) {
        return axios.delete<ErrorResponceType>(
            baseURL + `/api/site/v1/file/${fileId}`,
            {
                headers: {
                    "Authorization": `${localStorage.getItem("accessToken")}`,
                },
            },
        ).then(responce => responce.data)
    }
}