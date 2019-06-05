import {getMongoManager, ObjectID} from 'typeorm';

/* Entities */
import {Course} from '../entity/Course';
import {User} from '../entity/User'

/* Auth */
// Import authentication controller
import * as authentication from './auth';

const auth = authentication.auth();

export const toObjectId = (value: string | ObjectID): ObjectID => {
    return typeof value === 'string' ? new ObjectID(value) : value
}

// Course Controller Class
export class CourseController {
    public static getCourse(req, res) {
        const id = req.query.id;

        if (!id) {
            return res.status(400).send('Query parameter not found')
        }

        getMongoManager().findOne(Course, {id})
        .then((doc) => {
            res.json(doc)})
        .catch((err) => {
            console.log(err)
        })
    }

    public static async listCourses(req, res) {
        const token = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        
        if (token) {
            try {
                const user = await authentication.AuthController.VerifyToken(token)
                if (user) {
                    console.log(user)
                    getMongoManager().findByIds(Course, user.enrolledCourses)
                    .then((courses)=>{
                        courses.forEach(course => {
                            delete course.studentJoinSecret
                            delete course.TAJoinSecret
                            delete course.enrolledUsers
                        })
                        res.json(courses)
                    })
                } else {
                    res.status(403).send('Invalid auth token')
                }
            } catch (err) {
                console.log(err)
            }
        } else {
            return res.status(403).send('Auth token missing');
        }
    }

    public static async createCourse(req, res) {
        const {name, school, term} = req.body;

        if (!name || !school || !term) {
            res.send(400, 'Missing information')
        }

        let studentJoinSecret = ""
        let TAJoinSecret = ""
        for (var i=0; i < 3; i++) {
            studentJoinSecret += Math.random().toString(36).substring(2, 15)
            TAJoinSecret += Math.random().toString(36).substring(2, 15)
        }

        console.log('studentJoinSecret is', studentJoinSecret)
        console.log('TAJoinSecret is', TAJoinSecret)

        const course = {
            name,
            school,
            term,
            studentJoinSecret,
            TAJoinSecret,
            enrolledUsers: new Array(),
        };

        try {
            const result = await getMongoManager().insertOne(Course, course)
            console.log(result)
        } catch(err) {
            console.log(err)
        }

        res.status(200).send('Course created successfully')
    }

    public static async enrollCourse(req, res) {
        const secret: string = req.body.joinSecret;
        if (!secret){
            res.status(400).send('Course secret missing');
        }

        const token: string = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send('Auth token missing')
        }

        const user = await authentication.AuthController.VerifyToken(token)
        if (!user) {
            return res.send(400, 'Invalid auth token')
        }

        console.log('user identified: ', user.id)
        // Check whether course exists
        const course = await getMongoManager().findOne(Course, {studentJoinSecret: secret})
        console.log(course)

        try {
            user.enrolledCourses.forEach(element => {
                if (String(element) == String(course.id)) {
                    throw new Error()
                }
            });
            course.enrolledUsers.forEach(element => {
                if (String(element) == String(user.id)) {
                    throw new Error()
                }
            });
        } catch (err) {
            return res.status(400).send("User is already enrolled")
        }

        const s1 = await getMongoManager()
        .findOneAndUpdate(
            User, 
            {_id: user.id},
            {$push: {enrolledCourses: course.id}})
        .catch(err => {
            console.log(err)
            res.status(400).send(err)
        });

        const s2 = await getMongoManager()
        .findOneAndUpdate(
            Course,
            {_id: course.id},
            {$push: {enrolledUsers: user.id}})
        .catch(err => {
            console.log(err)
            res.status(400).send(err)
        });

        console.log(s1)
        console.log(s2)

        return res.status(200).send("User enrolled successfully.")
    }

    public static getProfiles(req, res) {
        const coursename = req.query.course;

        getMongoManager().findOne(Course, {name: coursename})
        .then((course) => {
            const users = course.enrolledUsers
            getMongoManager().findByIds(User, users)
                .then((docs)=>{
                    docs.forEach(user => {
                        delete user.password
                        delete user.username
                        delete user.uid
                    });
                    res.json(docs)
                })
        });
    }

    public static async getCourseBySecret(secret: string) {
        console.log(secret)
        return await getMongoManager()
        .findOne(Course, {studentJoinSecret: secret})
    }
}