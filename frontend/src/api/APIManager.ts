import Auth from './Auth';
import { API_HOST } from './constant';
import {sampleCourseDetails} from './mock';
import {
  Course,
  CourseDetails,
  CourseUsers, CreateCommentRequestBody,
  CreateCourseRequestBody,
  CreatePostRequestBody, CreateQuizRequestBody,
  EnrollCourseRequestBody,
} from './type';

export default class APIManager {
    public static createCourse(body: CreateCourseRequestBody): Promise<Response> {
        const headers = {
            'Content-Type': 'application/json',
            'token': `${Auth.getToken()}`,
        };
        return fetch(`${API_HOST}/course`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
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

    public static getCourseDetails(id: string): Promise<CourseDetails> {
        const headers: any = {
            'Content-Type': 'application/json',
        };
        if (Auth.isSignedIn()) {
            headers.Authorization = `jwt ${Auth.getToken()}`;
        }
        if(id === '5cfaab1710bdd34128453910') {
            return new Promise<CourseDetails>((resolve, reject) => {
                resolve(sampleCourseDetails);
            });
        }
        return fetch(`${API_HOST}/course/${id}/details`, {
            method: 'GET',
            headers,
        }).then((response) => {
            if (response.ok) {
                return response.json() as Promise<CourseDetails>;
            }
            throw new Error('Failed to get course info');
        }).then((course) => {
            // load mock data
            course.quizzes = sampleCourseDetails.quizzes;
            course.posts = sampleCourseDetails.posts;
            return course;
        });
    }

    public static getEnrolledCourses(): Promise<Course[]> {
        const headers = {
            'Content-Type': 'application/json',
            'token': `${Auth.getToken()}`,
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
            'token': `${Auth.getToken()}`,
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
            'token': `${Auth.getToken()}`,
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

    public static createPost(courseID: string, body: CreatePostRequestBody): Promise<void> {
        const headers = {
            'Content-Type': 'application/json',
            'token': `${Auth.getToken()}`,
        };
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                sampleCourseDetails.posts.push({
                    id: '',
                    author:     {
                        firstName: 'Yifei',
                        lastName: 'Fu',
                        uid: '123456789',
                        email: 'yf@g.com',
                        username: 'yifei',
                        role: 'student',
                    },
                    title: body.title,
                    content: body.content,
                    tags: body.tags,
                    creationTime: new Date().toISOString(),
                    comments: [],
                });
                resolve();
            }, 200);
        });
        return fetch(`${API_HOST}/course/${courseID}/post`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.ok) {
                return;
            }
            throw new Error('Failed to create post');
        });
    }

  public static createQuiz(courseID: string, body: CreateQuizRequestBody): Promise<void> {
    const headers = {
      'Content-Type': 'application/json',
      'token': `${Auth.getToken()}`,
    };
    return fetch(`${API_HOST}/course/${courseID}/quiz`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    }).then((response) => {
      if (response.ok) {
        return;
      }
      throw new Error('Failed to create quiz');
    });
  }

    public static createComment(courseID: string, postID: string, body: CreateCommentRequestBody): Promise<void> {
        const headers = {
            'Content-Type': 'application/json',
            'token': `${Auth.getToken()}`,
        };
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                const idx = sampleCourseDetails.posts.findIndex((post) => post.id === postID);
                if (idx === -1) {
                    reject();
                }
                sampleCourseDetails.posts[idx].comments.push({
                    author:     {
                        firstName: 'Yifei',
                        lastName: 'Fu',
                        uid: '123456789',
                        email: 'yf@g.com',
                        username: 'yifei',
                        role: 'student',
                    },
                    content: body.content,
                    creationTime: new Date().toISOString(),
                });
                resolve();
            }, 200);
        });
        return fetch(`${API_HOST}/course/${courseID}/post/${postID}/comment`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        }).then((response) => {
            if (response.ok) {
                return;
            }
            throw new Error('Failed to create post');
        });
    }
}
