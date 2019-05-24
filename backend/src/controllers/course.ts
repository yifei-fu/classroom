import {Request, Response} from 'express';
import {getMongoManager, MongoEntityManager} from 'typeorm';
import {Course} from '../entity/Course';

// Course Controller Class
export class CourseController {
    public static getCourse(req: Request, res: Response) {
        const name = req.query.name;

        getMongoManager().findOne(Course, {name})
        .then((doc) => {
            res.json(doc);
        });
    }

    public static listCourses(req: Request, res: Response) {
        getMongoManager().find(Course)
        .then((docs) => {
            res.json(docs);
        });
    }

    public static createCourse(req: Request, res: Response) {
        const {name, school, term} = req.body;
        const course = {
            name,
            school,
            term,
        };

        getMongoManager().insertOne(Course, course)
        .then(() => {console.log('Course created', course); })
        .catch((err) => {console.log(err); });
    }

    public static enrollCourse(req: Request, res: Response) {
        const secret = req.body.joinSecret;
    }

    public static getProfiles(req: Request, res: Response) {
        const coursename = req.query.class;

        getMongoManager().find(Course, {name: coursename})
        .then((doc) => {
            res.json(doc);
        });
    }
}
