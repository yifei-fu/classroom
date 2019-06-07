export type Role = 'student' | 'instructor' | 'TA' | 'guest';

export interface UserProfile {
    username: string;
    firstName: string;
    lastName: string;
    role: Role;
}

export interface Course {
    id: string;
    name: string;
    school: string;
    term: string;
    role: Role;
    description?: string;
    instructor: UserProfile;
    studentJoinSecret?: string;
    TAJoinSecret?: string;
}

export interface CourseUsers {
    students: UserProfile[];
    TAs: UserProfile[];
}

export interface Question {
    title: string;
    text: string;
    responseType: 'choices' | 'number' | 'string';
    responseChoices?: string[];
}

export interface Quiz {
    id: string;
    name: string;
    questions: Question[] | null; // null if current time < startTime
    startTime: string;
    endTime: string;
    openToRoles: Role[];
    resultVisibleToRoles: Role[];
    secret?: string;
}

export interface QuizResponse {
    id?: string;
    quizId: string;
    user?: UserProfile;
    responses: Array<string | number>;
}

export interface Comment {
    content: string;
    author: UserProfile;
    creationTime: string;
}

export interface Post {
    id: string;
    title: string;
    tags: string[];
    content: string;
    author: UserProfile;
    creationTime: string;
    comments: Comment[];
}

export interface CourseDetails extends Course {
    posts: Post[];
    quizzes: Quiz[];
}

// Interfaces for APIManager request body

export interface CreateCourseRequestBody {
    name: string;
    school: string;
    term: string;
}

export interface EnrollCourseRequestBody {
    joinSecret: string;
}

export interface UserSignUpRequestBody {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isInstructor: boolean;
    uid: string;
}

export interface CreatePostRequestBody {
    title: string;
    tags: string[];
    content: string;
}

export interface CreateQuizRequestBody {
    /*
    title1: string;
    answer1: string;
    content1: string;
    
    title2: string;
    answer2: string;
    content2: string;

    title3: string;
    answer3: string;
    content3: string;
    */

    title: string;
    tags: string[];
    content: string;
    answer: string;
}

export interface CreateCommentRequestBody {
    content: string;
}
