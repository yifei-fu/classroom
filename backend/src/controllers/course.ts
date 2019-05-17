import {getMongoManager} from "typeorm"
import {Course} from '../entity/Course'

// Course Controller Class
export class CourseController {
    public static getCourse(req, res, mgr) {
        let name = req.query.name
        mgr.findOne(Course, {name: name})
        .then(doc => {
            res.json(doc);
        });
    }
    
    public static listCourses(req, res, mgr) {
        mgr.find(Course)
        .then(docs => {
            res.json(docs);
        });
    }

    public static createCourse(req, res, mgr) {
    }

    public static enrollCourse(req, res, mgr) {
    }

    public static getProfiles(req, res, mgr) {
    }
}
