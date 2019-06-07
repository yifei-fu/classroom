import {getMongoManager} from 'typeorm';
import {Config} from '../config';
import {Quiz} from '../entity/Quiz';
import {Question} from '../entity/Question';
import {AuthController} from './auth'
import {Course} from '../entity/Course';
import {QuizResponse} from '../entity/QuizResponse';
import {UserProfile} from '../entity/UserProfile';
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

                        let newQuestions: Question[];
                        questions.forEach(question=> {
                                
                            const newQuestion: Question = getMongoManager().create(Question, {
                                title: question.title,
                                text: question.text,
                                responseType: question.responseType,
                                responseChoices: question.responseChoices
                            });
                            newQuestions.push(newQuestion)
                        });
                        
                        const newQuiz: Quiz = getMongoManager().create(Quiz, {
                            name,
                            startTime,
                            endTime,
                            secret,
                            questions: newQuestions
                        });

                        const result = await getMongoManager().save(Quiz, newQuiz);
                        console.log(result)
                        res.status(200).send('Quiz created')
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
            return res.status(401).send('Auth token missing');
        }
    }

    public static async submitQuizResponse(req, res) {
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (token){
            try {
                const user = await AuthController.VerifyToken(token)
                if (!user) {
                    res.status(401).send('Invalid auth token')
                }
                const profile = await getMongoManager().findOne(UserProfile, {uid: user.uid})
                if (!profile) {
                    res.status(401).send('UserProfile does not exists')
                }

                const {responses} = req.body
                if (!responses) {
                    res.status(400).send('Required parameters not found')
                }

                const courseID = req.params.courseID 
                const quizID = req.params.quizID

                const course = await getMongoManager().findOne(Course, courseID);
                const quiz = await getMongoManager().findOne(Quiz, quizID)

                if (!course) {
                    res.status(404).send('Course ID is inavlid')
                }

                if (!quiz) {
                    res.status(404).send('Quiz ID is invalid')
                }

                const newResponse = await getMongoManager().create(QuizResponse, {
                    quizId: quizID,
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

    public static async getQuizeResponse(req, res) {
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (token) {
            try {
                const user = await AuthController.VerifyToken(token)
                if (!user) {
                    res.status(401).send('Invalid auth token')
                }

                const profile = await getMongoManager().findOne(UserProfile, {uid: user.uid})
                if (!profile) {
                    res.status(401).send('UserProfile does not exists')
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

                const responses = await getMongoManager().find(QuizResponse, {quizId: quizID});
                if (!responses) {
                    return res.status(404).send('User has not submitted any responses')
                }

                let result = new Array()
                responses.forEach((response) => {
                    result.push(response.responses)
                })

                return res.json(result)

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

                        const responses = await getMongoManager().find(QuizResponse, {quizId: quizID})

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
