import {getMongoManager} from 'typeorm';
import {Config} from '../config';
import {Quiz} from '../entity/Quiz';
import {Question} from '../entity/Question';
import {AuthController} from './auth'
import {Course} from '../entity/Course';
import {QuizResponse} from '../entity/QuizResponse';
import {UserProfile} from '../entity/UserProfile';
import { CourseDetails } from '../entity/CourseDetails';
const config: Config = require('../config.json')

export class QuizController {
    public static async createQuiz(req, res) {
        // Check token and make sure use is Instructor
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];

        if (token) {
            try {
                const user = await AuthController.VerifyToken(token)
                if (user) {
                    if (user.isInstructor) {
                        console.log('Instructor detected')
                        const {name, startTime, endTime, secret, questions} = req.body;
                        if (!name || !startTime || !endTime) {
                            return res.status(400).send('Required params not found')
                        }
                        const courseID = req.params.courseID;
                        const course = await getMongoManager().findOne(Course, courseID);

                        if (!course) {
                            return res.status(400).send('Course id is invalid')
                        }
                        console.log(questions)
                        // let newQuestions: Question[] = new Array<Question>();

                        const newQuiz: Quiz = await getMongoManager().create(Quiz, {
                            name,
                            startTime,
                            endTime,
                            secret,
                            courseID,
                            questions: new Array()
                        });

                        console.log(newQuiz)

                        const result = await getMongoManager().save(Quiz, newQuiz);
                        
                        const quizID = result.id
                        questions.forEach(async question => {
                            const q = await getMongoManager()
                            .findOneAndUpdate(Quiz,
                                {_id: quizID},
                                {$push: {questions: question}})
                        });

                        const quiz = await getMongoManager().findOne(Quiz, quizID)

                        console.log(quiz)

                        await getMongoManager().findOneAndUpdate(
                            CourseDetails,
                            {courseID: String(courseID)},
                            {$push: {quizzes: quiz}})

                        const details = await getMongoManager().findOne(
                            CourseDetails,
                            {courseID: String(courseID)}
                        )
                        console.log(details)
                        res.json(quiz)
                    } else {
                        return res.status(401).send('User is not an instructor')
                    }
                } else {
                    return res.status(401).send('Invalid auth token')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            return res.status(401).send('Auth token missing');
        }
    }

    public static async submitQuizResponse(req, res) {
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (token){
            try {
                const user = await AuthController.VerifyToken(token)
                if (!user) {
                    return res.status(401).send('Invalid auth token')
                }
                const profile = await getMongoManager().findOne(UserProfile, {uid: user.uid})
                if (!profile) {
                    return res.status(401).send('UserProfile does not exists')
                }

                const {responses} = req.body
                if (!responses) {
                    return res.status(400).send('Required parameters not found')
                }

                const courseID = req.params.courseID 
                const quizID = req.params.quizID

                const course = await getMongoManager().findOne(Course, courseID);
                const quiz = await getMongoManager().findOne(Quiz, quizID)

                if (!course) {
                    return res.status(404).send('Course ID is inavlid')
                }

                if (!quiz) {
                    return res.status(404).send('Quiz ID is invalid')
                }
                const exsitingResponse = await getMongoManager().findOne(QuizResponse, {user: profile})
                if (exsitingResponse) {
                    return res.status(404).send('User has already responded')
                }

                const newResponse = await getMongoManager().create(QuizResponse, {
                    quizId: String(quizID),
                    user: profile,
                    responses
                });

                const result = await getMongoManager().save(QuizResponse, newResponse);
                console.log(result)

                res.status(200).send('QuizResponse received')

            } catch(err) {
                console.log(err)
                return res.status(400).send('Something bad happened')
            }
        } else {
            return res.status(401).send('Auth token missing')
        }
    }

    public static async getQuizResponse(req, res) {
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (token) {
            try {
                const user = await AuthController.VerifyToken(token)
                if (!user) {
                    return res.status(401).send('Invalid auth token')
                }

                const profile = await getMongoManager().findOne(UserProfile, {uid: user.uid})
                if (!profile) {
                    return res.status(401).send('UserProfile does not exists')
                }

                const courseID = req.params.courseID 
                const quizID = req.params.quizID

                
                const course = await getMongoManager().findOne(Course, courseID);
                const quiz = await getMongoManager().findOne(Quiz, quizID)

                if (!course) {
                    return res.status(404).send('Course ID is inavlid')
                }

                if (!quiz) {
                    return res.status(404).send('Quiz ID is invalid')
                }

                const response = await getMongoManager()
                .findOne(QuizResponse,
                    {user: profile});
                if (!response) {
                    return res.status(404).send('User has not submitted any responses')
                }

                return res.json(response)
            } catch (err) {
                console.log(err)
                return res.status(400).send('Something bad happened')
            }
        } else {
            return res.status(401).send('Auth token missing')
        }
    }

    public static async getQuizResponses(req, res) {
        // Check token and make sure use is Instructor
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (token) {
            try {
                const user = await AuthController.VerifyToken(token)
                if (user) {
                    if (user.isInstructor) {
                        console.log('Instructor detected')

                        const courseID = req.params.courseID;
                        const course = await getMongoManager().findOne(Course, courseID);

                        if (!course) {
                            return res.status(404).send('Course id is invalid')
                        }

                        const quizID = req.params.quizID;
                        const quiz = await getMongoManager().findOne(Quiz, quizID)

                        if (!quiz) {
                            return res.status(404).send('Quiz id is invalid')
                        }

                        const responses = await getMongoManager().find(QuizResponse, {quizId: String(quizID)})

                        if (!responses) {
                            return res.statys(404).send('No responses found')
                        }

                        return res.json(responses)
                        
                    } else {
                        return res.status(401).send('User is not an instructor')
                    }
                } else {
                    return res.status(401).send('Invalid auth token')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            return res.status(401).send('Auth token missing');
        }
    }

    public static async addQuestionToQuiz(req, res) {
        // Check token and make sure use is Instructor
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (token) {
            try {
                const user = await AuthController.VerifyToken(token)
                if (user) {
                    if (user.isInstructor) {
                        console.log('Instructor detected')
                        const {title, text, responseType, responseChoices} = req.body;
                        if (!title || !text || !responseType || !responseChoices) {
                            return res.status(400).send('Required params not found')
                        }
                        const courseID = req.params.courseID;
                        const course = await getMongoManager().findOne(Course, courseID);

                        if (!course) {
                            return res.status(400).send('Course id is invalid')
                        }
                        
                        const quizID = req.params.quizID;
                        const quiz = await getMongoManager().findOne(Quiz, quizID)

                        if (!quiz) {
                            return res.status(400).send('Quiz id is invalid')
                        }

                        const newQuestion: Question = getMongoManager().create(Question, {
                            title,
                            text,
                            responseType,
                            responseChoices
                        });

                        const result = await getMongoManager()
                        .findOneAndUpdate(Quiz,
                            {id: quizID},
                            {$push: {questions: newQuestion}})
                        .catch((err)=>{console.log('Something went wrong.')})

                        console.log(result)
                        res.status(200).send('Question added to Quiz')
                    } else {
                        res.status(401).send('User is not an instructor')
                    }
                } else {
                    res.status(401).send('Invalid auth token')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            return res.status(401).send('Auth token missing')
        }
    }
}
