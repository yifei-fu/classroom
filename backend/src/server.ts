import 'reflect-metadata';

import {equal} from 'assert';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as authentication from './controllers/auth'
import {Connection, ConnectionOptions, createConnection, getMongoManager} from 'typeorm';

// Import Entities
import {Course} from './entity/Course';
import {User} from './entity/User';
import {UserProfile} from './entity/UserProfile';
import {QuizResponse} from './entity/QuizResponse';
import {Quiz} from './entity/Quiz';
import {Question} from './entity/Question';
import {CourseDetails} from './entity/CourseDetails';

// Import Controllers
import {CourseController} from './controllers/course';
import {UserController} from './controllers/user';
import {UserProfileController} from './controllers/userprofile';
import {QuizController} from './controllers/quiz';


// get configurations from environment variables
const port: number = Number(process.env.PORT) || 8080;
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const auth = authentication.auth();

const options: ConnectionOptions = {
    type: 'mongodb',
    entities: [User, UserProfile, Course, Quiz, Question, QuizResponse, CourseDetails],
};

function PopulateDatabase(connection: Connection) {
    const user = new UserProfile();
    user.firstName = 'Paul';
    user.lastName = 'Eggert';
    const usersRepository = connection.getRepository(UserProfile);

    usersRepository
    .save(user)
    .then((user) => console.log('UserProifle has been saved: ', user))
    .catch((error) => console.log('Cannot save. Error: ', error));

    const course = new Course();
    course.name = 'CS130';
    course.instructors = new Array();
    course.school = 'UCLA';
    course.term = 'Spring 2019';

    const courseRepository = connection.getRepository(Course);

    courseRepository
    .save(course)
    .then((course) => console.log('Course has been saved: ', course))
    .catch((error) => console.log('Cannot save. Error: ', error));
}

const connection = createConnection(options).then((connection) => {
    console.log('It works!');
    // PopulateDatabase(connection);
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

const app = express();

// initialize middleware
app.use(bodyParser.json());
app.use(compression());
app.use(cors());

// route API endpoints
app.get('/healthcheck', (req, res) => {
    res.send()
});

// ===================================================
// API endpoints for UserProfile
// ===================================================
// Return all userprofiles
app.get('/users', UserProfileController.getUserProfiles);

// ===================================================
// API endpoints for User
// ===================================================
// Get profile of current user
app.get('/user', urlencodedParser, UserController.getUser);

// Create new user
app.post('/user', urlencodedParser, UserController.createUser);

// User Login
app.post('/user/login', urlencodedParser, UserController.login);

// User Logout
app.get('/user/logout', urlencodedParser, UserController.logout);

// ===================================================
// API endpoints for courses
// ===================================================
app.get('/courses', CourseController.listCourses);

// Get course details
app.get('/course/:id/details', CourseController.getCourseDetails);

// Get Course by id
app.get('/course/:id', urlencodedParser, CourseController.getCourse);

// Creat Course
app.post('/course', urlencodedParser, CourseController.createCourse);

// Get User enrolled in a course
app.get('/course/:id/users', urlencodedParser, CourseController.getProfiles);

// Enroll a user in a course
app.put('/course/:id/enroll', urlencodedParser, CourseController.enrollCourse);

// ===================================================
// API endpoints for Quiz
// ===================================================
// Get the user's response of a quiz
app.get('/course/:courseID/quiz/:quizID/response', urlencodedParser, QuizController.getQuizResponse);

// Get all responses of a quiz
app.get('/course/:courseID/quiz/:quizID/responses', urlencodedParser, QuizController.getQuizResponses);

// Create a quiz in a course. The user must be the instructor.
app.post('/course/:courseID/quiz', urlencodedParser, QuizController.createQuiz);

// Submit the user's response of a quiz
app.post('/course/:courseID/quiz/:quizID/response', urlencodedParser, QuizController.submitQuizResponse);

// Add qui to question
app.post('/course/:courseID/quiz/add', urlencodedParser, QuizController.addQuestionToQuiz);

// start Express app
app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});
