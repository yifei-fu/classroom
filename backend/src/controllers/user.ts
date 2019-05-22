import {getMongoManager} from 'typeorm';
import {User} from '../entity/User';

// User Controller Class
export class UserController {
    public static login(req, res, mgr) {
        const username = req.body.username;
        const password = req.body.password;
        const query = {
            username,
            password,
        };
        mgr.findOne(User, query).then((doc) => {
            if (doc != null) {
                /*TODO: Set browser cookie with JWT*/
                res.send('Authenticated');
                console.log();
            } else {
                res.send('Authentication failed');
            }
        });
    }

    public static logout(req, res, mgr) {
        /*TODO: Clear cookie with JWT*/
        res.send();
    }

    public static createUser(req, res, mgr) {
        const username = req.body.username;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const email = req.body.email;
        const password = req.body.password;
        const isInstructor = req.body.isInstructor;
        const uid = req.body.uid;

        /* TODO: Validate fields */

        // Check whether user exists
        const user = this.userExist(username, mgr);
        if (user != null) {
            res.send(400, 'User already exists');
        }

        const newUser = {
            username,
            firstname,
            lastname,
            email,
            password,
            isInstructor,
            uid,
        };

        mgr.InserOne(User, newUser)
        .then(console.log('User created'))
        .catch((err) => {console.log(err); });

        res.send(200, 'successful operation');
        /* TODO: When user is created, a user profile should be created as well
        Call creatUserProfile()
        */
    }

    public static getUser(req, res, mgr) {
        /* TODO: Implement jwt */
        // Identify user with jwt
        const username = 'user';

        mgr.FindOne(User, {username})
        .then((doc) => {
            console.log('Obtained User');
            res.send();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    private static userExist(username: string, mgr) {
        mgr.FindOne(User, {username})
        .then((doc) => {
            if (doc == null) {
                return false;
            }
            return true;
        });
    }
}
