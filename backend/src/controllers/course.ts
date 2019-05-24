import {getMongoManager, AdvancedConsoleLogger} from "typeorm"
import {Course} from '../entity/Course'

// Course Controller Class
export class CourseController {
    public static getCourse(req, res) {
        const name = req.query.name

        getMongoManager().findOne(Course, {name})
        .then((doc) => {
            res.json(doc);
        });
    }
    
    public static listCourses(req, res) {
        getMongoManager().find(Course)
        .then((docs) => {
            res.json(docs);
        });
    }

    public static createCourse(req, res) {
        const {name, school, term}  = req.body;

        const course = {
            name: name,
            school: school,
            term: term
        };

        getMongoManager().insertOne(Course, course)
        .then(() => {console.log("Course created", course) })
        .catch((err) => {console.log(err); });
    }

    public static enrollCourse(req, res) {
        const secret = req.body.joinSecret
    }

    public static getProfiles(req, res) {
        const coursename = req.query.class

        getMongoManager().find(Course, {name: coursename})
        .then((doc) => {
            res.json(doc);
        });
    }
}
