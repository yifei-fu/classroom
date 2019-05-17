import {getMongoManager} from "typeorm"
import {User} from '../entity/User'

// User Controller Class
export class UserController {
    public static login(req, res, mgr) {
        let username = req.body.username;
        let password = req.body.password;
    }

    public static logout(req, res, mgr) {
        res.send()
    }

    public static createUser(req, res, mgr) {
        res.send()
        /* TODO: When user is created, a user profile should be created as well */
    }
 
    public static getUser(req, res, mgr) {
        res.send()
        /* TODO: Implement jwt */
        // Identify user with jwt

    }
}