import {getMongoManager, AdvancedConsoleLogger} from "typeorm"
import {Course} from '../entity/Course'

// Course Controller Class
export class CourseController {
    public static getCourse(req, res) {
        let name = req.query.name

        getMongoManager().findOne(Course, {name: name})
        .then(doc => {
            res.json(doc);
        });
    }
    
    public static listCourses(req, res) {
        getMongoManager().find(Course)
        .then(docs => {
            res.json(docs);
        });
    }

    public static createCourse(req, res) {
        let name = req.body.name;
        let school = req.body.school;
        let term = req.body.term;

        let course = {
            name: name,
            school: school,
            term: term
        };

        getMongoManager().insertOne(Course, course)
        .then(() => {console.log("Course created")})
        .catch(err => {console.log(err)});
    }

    public static enrollCourse(req, res) {
        let secret = req.body.joinSecret
    }

    public static getProfiles(req, res) {
        let coursename = req.query.class

        getMongoManager().find(Course, {name: coursename})
        .then(doc => {
            res.json(doc);
        });
    }
}
