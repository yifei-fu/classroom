import 'reflect-metadata';

import {equal} from 'assert';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import {Connection, ConnectionOptions, createConnection, getMongoManager} from 'typeorm';

// Import Entities
import {Course} from './entity/Course';
import {User} from './entity/User';
import {UserProfile} from './entity/UserProfile';

// Import Controllers
import {CourseController} from './controllers/course';
import {UserController} from './controllers/user';
import {UserProfileController} from './controllers/userprofile';

// get configurations from environment variables
const port: number = Number(process.env.PORT) || 8080;
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonencodedParser = bodyParser.json();

const options: ConnectionOptions = {
    type: 'mongodb',
    entities: [User, UserProfile, Course],
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
    course.instructor = user;
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
const manager = getMongoManager();

// initialize middleware
app.use(bodyParser.json());
app.use(compression());
app.use(cors());

// route API endpoints
app.get('/healthcheck', (req, res) => {
    res.send();
});

// ===================================================
// API endpoints for UserProfile
// ===================================================
// Return all userprofiles
app.get('/users', (req, res) => {
    UserProfileController.getUserProfiles(req, res, manager);
});

// ===================================================
// API endpoints for User
// ===================================================
// Get profile of current user
app.get('/user', urlencodedParser, (req, res) => {
    UserController.getUser(req, res, manager);
});

// Create new user
app.post('/user', urlencodedParser, (req, res) => {
    UserController.createUser(req, res, manager);
});

// User Login
app.post('/user/login', urlencodedParser,  (req, res) => {
    UserController.login(req, res, manager);
});

// User Logout
app.get('/user/logout', urlencodedParser, (req, res, next) => {
    UserController.logout(req, res, manager);
    res.json();
});

// ===================================================
// API endpoints for courses
// ===================================================
app.get('/courses', (req, res) => {
    CourseController.listCourses(req, res, manager);
});

// Get Course by name
app.get('/course', urlencodedParser, (req, res) => {
    console.log(req.body);
    CourseController.getCourse(req, res, manager);
});

// Creat Course
app.post('/course', urlencodedParser, (req, res) => {
    CourseController.createCourse(req, res, manager);
});

// Get User enrolled in a course
app.get('/course/users', urlencodedParser, (req, res) => {
    CourseController.getProfiles(req, res, manager);
});

// Enroll a user in a course
app.put('/course/enroll', urlencodedParser, (req, res) => {
    CourseController.enrollCourse(req, res, manager);
});

// start Express app
app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});
