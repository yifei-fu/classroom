import {getMongoManager, MongoEntityManager} from 'typeorm';
import {User} from '../entity/User';

// User Controller Class
export class UserController {
    public static login(req, res) {
        const {username, password} = req.body;
        const query = {
            username: username,
            password: password
        };

        getMongoManager().findOne(User, query).then((doc) => {
            if (doc) {
                /*TODO: Set browser cookie with JWT*/
                res.send(200, 'Authenticated')
            } else {
                res.send(400, 'Authentication failed')
            }
        });
    }

    public static logout(req, res) {
        /*TODO: Clear cookie with JWT*/
        res.send();
    }

    public static createUser(req, res) {
        const {username, firstname, lastname, email, password, isInstructor, uid} = req.body

        /* TODO: Validate fields */

        // Check whether user exists
        const user = this.userExist(username);
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

        getMongoManager().insertOne(User, newUser)
        .then(() => console.log('User created'))
        .catch((err) => {console.log(err); });

        res.send(200, 'successful operation');
        /* TODO: When user is created, a user profile should be created as well
        Call creatUserProfile()
        */
    }

    public static getUser(req, res) {
        /* TODO: Implement jwt */
        // Identify user with jwt
        const username = 'user';

        getMongoManager().findOne(User, {username})
        .then((doc) => {
            console.log('Obtained User');
            res.send();
        })
        .catch((err) => {
            console.log(err);
        });
    }

    private static userExist(username: string) {
        getMongoManager().findOne(User, {username})
        .then((doc) => {
            if (doc == null) {
                return false;
            }
            return true;
        });
    }
}
