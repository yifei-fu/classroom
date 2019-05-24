import {getMongoManager, MongoEntityManager, TreeLevelColumn} from 'typeorm';
import {Config} from '../config';
import {User} from '../entity/User';
import * as jwt from 'jwt-simple';
import * as auth from './auth';

const config: Config = require('../config.json')

// User Controller Class
export class UserController {
    public static login(req, res) {
        const {username, password} = req.body;
        if (!username && !password) {
            res.send(404, 'No valid credentials found')
        }
        getMongoManager().findOne(User, {username, password}).then((doc) => {
            if (doc) {
                console.log('Found User')

                // Return jwt token
                const payload = {
                    uid: doc.uid
                };
                const token = jwt.encode(payload, config.jwtSecret)
                res.json({
                    token: token
                });
            } else {
                res.json({'detail': 'Authentcation failed'});
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
        getMongoManager().findOne(User, {username})
        .then((doc) => {
            if (!doc) {
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

                res.send(200, 'Successful operation');
                /* TODO: When user is created, a user profile should be created as well
                Call creatUserProfile()
                */
            } else {
                res.send(400, 'User already exists');
            }
        });
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

    public static async getUserByUID(uid: string) {
        return await getMongoManager().findOne(User, {uid});
    }
}
