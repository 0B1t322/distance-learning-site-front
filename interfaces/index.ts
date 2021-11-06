// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import { User } from 'path/to/interfaces';

import { FileType } from "../pages/api/course"

export type User = {
  id: number
  firstName: string
  secondName: string
  thirdName: string
}

export type CourseUser = {
    id: number
    user: User
}

export type CourseUsers = {
    teachers?: CourseUser[]
    students?: CourseUser[]
}

export type Course = {
    id:             number
    courseName:     string
    courseUsers:    CourseUsers
    topics?:         CourseTopic[]
}

export type File = {
    id:         number
    name:       string
    fileUrl:    string
}

export type CourseTopic = {
    id:         number
    name:       string
    files?:     FileType[]
}