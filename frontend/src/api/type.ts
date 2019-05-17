export interface UserSignUpRequestBody {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isInstructor: boolean;
    uid: string;
}

export interface UserProfile {
    username: string;
    firstName: string;
    lastName: string;
    isInstructor: boolean;
}

export interface Course {
    id: string;
    name: string;
    school: string;
    term: string;
    instructor: UserProfile;
    studentJoinSecret: string;
    tAJoinSecret: string;
}

export interface CourseUsers {
    students: Course[];
    TAs: Course[];
}

export type Role = 'student' | 'instructor' | 'TA';

export interface CourseInfo {
    course: Course
    role: Role
}

export interface CreateCourseRequestBody {
    name?: string;
    school?: string;
    term?: string;
}

export interface EnrollCourseRequestBody {
    joinSecret?: string;
}
