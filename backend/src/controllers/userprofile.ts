import {getMongoManager} from "typeorm"
import {UserProfile} from '../entity/UserProfile'

// UserProfile Controller Class
export class UserProfileController {
    public static getUserProfiles(req, res, mgr) {
        mgr.find(UserProfile)
        .then(docs => {
            console.log(docs)
            res.json(docs);
        });
    }
}
