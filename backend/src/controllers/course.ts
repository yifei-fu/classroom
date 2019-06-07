import {getMongoManager} from 'typeorm';
import {ObjectID} from 'mongodb'

/* Entities */
import {Course} from '../entity/Course';
import {User} from '../entity/User'
import {CourseDetails} from '../entity/CourseDetails';

/* Auth */
// Import authentication controller
import * as authentication from './auth';
import { UserProfile } from '../entity/UserProfile';

const auth = authentication.auth();

export const toObjectId = (value: string | ObjectID): ObjectID => {
    return typeof value === 'string' ? new ObjectID(value) : value
}

// Course Controller Class
export class CourseController {
    public static getCourse(req, res) {
        const id = toObjectId(req.params.id);

        if (!id) {
            return res.status(400).send('id parameter not found')
        }

        getMongoManager().findOne(Course, id)
        .then((doc) => {
            if (doc) {return res.json(doc)}
            else {return res.status(400).send('Course with that id does not exists')}
        })
        .catch((err) => {
            console.log(err)
        })
    }

    public static async getCourseDetails(req, res) {
        const id = toObjectId(req.params.id);

        if(!id) {
            return res.status(400).send('Course id parameter not found')
        }

        const course = await getMongoManager().findOne(Course, id)
        if(!course) {
            return res.status(404).send('Course with that id does not exist')
        }
        
        const courseDetails = await getMongoManager().findOne(CourseDetails, {courseID: String(id)})
        res.json(courseDetails)
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
                        })
                        return res.json(courses)
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
        const {name, school, term, description} = req.body;

        if (!name|| !school|| !term) {
            res.send(400, 'Missing information')
        }

        const token: string = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send('Auth token missing')
        }

        const user = await authentication.AuthController.VerifyToken(token)
        if (!user) {
            return res.send(400, 'Invalid auth token')
        }

        if (!user.isInstructor) {
            return res.send(403, 'User is not an instructor')
        }

        let studentJoinSecret = ""
        let TAJoinSecret = ""
        for (var i=0; i <1; i++) {
            studentJoinSecret += Math.random().toString(36).substring(8, 15)
            TAJoinSecret += Math.random().toString(36).substring(8, 15)
        }

        console.log('studentJoinSecret is', studentJoinSecret)
        console.log('TAJoinSecret is', TAJoinSecret)

        const newCourse = await getMongoManager().create(Course, {
            name,
            school,
            term,
            studentJoinSecret,
            TAJoinSecret,
            enrolledUsers: new Array(),
            instructors: new Array(),
        });

        const course: Course = await getMongoManager().save(Course, newCourse)
        console.log(course.id)
        const s1 = await getMongoManager()
        .findOneAndUpdate(
            User,
            {_id: user.id},
            {$push: {enrolledCourses: course.id}})

        const s2 = await getMongoManager()
        .findOneAndUpdate(
            UserProfile,
            {uid: user.uid},
            {$push: {enrolledCourses: course.id}})

        const profile = await getMongoManager().findOne(UserProfile, {uid: user.uid})
        console.log(profile)

        await getMongoManager()
        .findOneAndUpdate(
            Course,
            {_id: course.id},
            {$push: {enrolledUsers: profile, instructors: profile}})

        const result = await getMongoManager().findOne(Course, course.id)

        const courseDetails = getMongoManager().create(CourseDetails, {
            courseID: String(result.id),
            name: result.name,
            description: description,
            school: result.school,
            term: result.term,
            studentJoinSecret: result.studentJoinSecret,
            TAJoinSecret: result.TAJoinSecret,
            enrolledUsers: new Array(),
            instructors: new Array(),
            quizzes: new Array()
        });

        courseDetails.enrolledUsers = result.enrolledUsers
        courseDetails.instructors = result.instructors
        courseDetails.quizzes = []

        const details = await getMongoManager().save(CourseDetails, courseDetails)
        console.log(details)

        return res.json(result)
    }

    public static async enrollCourse(req, res) {
        const secret: string = req.body.joinSecret;
        if (!secret){
            res.status(400).send('Course secret missing');
        }

        const id: ObjectID = req.params.id

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
        const course = await getMongoManager().findOne(Course, id)
        if (!course) {
            return res.status(400).send('Invalid course id')
        }

        if (user.isInstructor == true) {
            if (course.TAJoinSecret != secret) {
                return res.status(400).send('TASecret and Course ID do not match')
            }
            
            try {
                user.enrolledCourses.forEach(element => {
                    if (String(element) == String(course.id)) {
                        throw new Error('EnrolledCourses has course id')
                    }
                });
                course.instructors.forEach(element => {
                    if (element.uid == user.uid) {
                        throw new Error('EnrolledUsers has user id')
                    }
                });
            } catch (err) {
                console.log(err)
                return res.status(400).send("TA is already enrolled")
            }

            await getMongoManager()
            .findOneAndUpdate(
                User, 
                {_id: user.id},
                {$push: {enrolledCourses: course.id}})
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            });
    
            const TAProfile = await getMongoManager()
            .findOne(UserProfile, {uid: user.uid});

            console.log("TAProfile:", TAProfile)

            await getMongoManager()
            .findOneAndUpdate(
                Course,
                {_id: course.id},
                {$push: {instructors: TAProfile, enrolledUsers: TAProfile}})
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            });
    
            await getMongoManager()
            .findOneAndUpdate(
                CourseDetails,
                {courseID: String(course.id)},
                {$push: {instructors: TAProfile, enrolledUsers: TAProfile}}
            )

            const details = await getMongoManager()
            .findOne(
                CourseDetails,
                {courseID: String(course.id)}
            )

            console.log('Details:', details)

            return res.status(200).send("Instructor added successfully.")

        } else {
            if (course.studentJoinSecret != secret) {
                return res.status(400).send('studentSecret and Course ID do not match.')
            }

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

            await getMongoManager()
            .findOneAndUpdate(
                User, 
                {_id: user.id},
                {$push: {enrolledCourses: course.id}})
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            });
    
            const profile = await getMongoManager()
            .findOne(UserProfile, {uid: user.uid});

            console.log("Profile:", profile)

            await getMongoManager()
            .findOneAndUpdate(
                Course,
                {_id: course.id},
                {$push: {enrolledUsers: profile}})
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            });
    
            await getMongoManager()
            .findOneAndUpdate(
                CourseDetails,
                {courseID: String(course.id)},
                {$push: {enrolledUsers: profile}}
            )

            return res.status(200).send("User enrolled successfully.")
        }
    }

    public static getProfiles(req, res) {
        const id: ObjectID = toObjectId(req.params.id);

        getMongoManager().findOne(Course, id)
        .then((course) => {
            if (!course) {
                return res.status(400).send('Invalid course id')
            }
            return res.json(course.enrolledUsers)
            })
    }

    public static async getCourseBySecret(secret: string) {
        console.log(secret)
        return await getMongoManager()
        .findOne(Course, {studentJoinSecret: secret})
    }
}
