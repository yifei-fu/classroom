import {Request, Response} from 'express';
import {getMongoManager, MongoEntityManager} from 'typeorm';
import {UserProfile} from '../entity/UserProfile';

// UserProfile Controller Class
export class UserProfileController {
    public static getUserProfiles(req: Request, res: Response) {
        getMongoManager().find(UserProfile)
        .then((docs) => {
            console.log(docs);
            res.json(docs);
        });
    }
}
