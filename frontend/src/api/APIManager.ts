import Auth from './Auth';
import { API_HOST } from './constant';
import { Course, CourseUsers, CreateCourseRequestBody, EnrollCourseRequestBody } from './type';

export default class APIManager {
    public static createCourse(body: CreateCourseRequestBody): Promise<Course> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `jwt ${Auth.getToken()}`,
        };
        return fetch(`${API_HOST}/course`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.ok) {
                return response.json() as Promise<Course>;
            }
            throw new Error('Failed to create a new course');
        });
    }

    public static getCourse(id: string): Promise<Course> {
        const headers: any = {
            'Content-Type': 'application/json',
        };
        if (Auth.isSignedIn()) {
            headers.Authorization = `jwt ${Auth.getToken()}`;
        }
        return fetch(`${API_HOST}/course/${id}`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.ok) {
                return response.json() as Promise<Course>;
            }
            throw new Error('Failed to get course info');
        });
    }

    public static getEnrolledCourses(): Promise<Course[]> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `jwt ${Auth.getToken()}`,
            'mode': 'no-cors',
        };
        return fetch(`${API_HOST}/courses`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.ok) {
                return response.json() as Promise<Course[]>;
            }
            throw new Error('Failed to get enrolled courses');
        });
    }

    public static getCourseUsers(id: string): Promise<CourseUsers> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `jwt ${Auth.getToken()}`,
        };
        return fetch(`${API_HOST}/course/${id}/users`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.ok) {
                return response.json() as Promise<CourseUsers>;
            }
            throw new Error('Failed to enroll');
        });
    }

    public static enrollCourse(id: string, body: EnrollCourseRequestBody): Promise<void> {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `jwt ${Auth.getToken()}`,
        };
        return fetch(`${API_HOST}/course/${id}/enroll`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.ok) {
                return;
            }
            throw new Error('Failed to enroll');
        });
    }
}
