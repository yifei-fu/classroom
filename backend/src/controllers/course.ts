import {AdvancedConsoleLogger, getMongoManager} from 'typeorm';
import {Course} from '../entity/Course';

// Course Controller Class
export class CourseController {
    public static getCourse(req, res, mgr) {
        const name = req.query.name;

        mgr.findOne(Course, {name})
        .then((doc) => {
            res.json(doc);
        });
    }

    public static listCourses(req, res, mgr) {
        mgr.find(Course)
        .then((docs) => {
            res.json(docs);
        });
    }

    public static createCourse(req, res, mgr) {
        const name = req.body.name;
        const school = req.body.school;
        const term = req.body.term;

        const course = {
            name,
            school,
            term,
        };

        mgr.InsertOne(Course, course)
        .then(() => {console.log('Course created'); })
        .catch((err) => {console.log(err); });
    }

    public static enrollCourse(req, res, mgr) {
        const secret = req.body.joinSecret;
    }

    public static getProfiles(req, res, mgr) {
        const coursename = req.query.class;

        mgr.find(Course, {name: coursename})
        .then((doc) => {
            res.json(doc);
        });
    }
}
