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

export type GetCourseResponceType = {
    id: number
    courseName: string
    courseUsers: CourseUsersType
}

export const courseAPI = {
    getCourses() {
        return axios.get<GetCoursesResponceType & ErrorResponceType>(
            baseURL + '/api/site/v1/course',
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
    }
}