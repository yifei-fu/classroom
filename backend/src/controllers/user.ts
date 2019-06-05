import {getMongoManager, MongoEntityManager, TreeLevelColumn} from 'typeorm';
import {Config} from '../config';
import {User} from '../entity/User';
import {UserProfile} from '../entity/UserProfile';
import * as jwt from 'jwt-simple';
import * as crypto from 'crypto';
import {UserProfileController} from './userprofile';
import {AuthController} from './auth'
const config: Config = require('../config.json')

// User Controller Class
export class UserController {
    public static login(req, res) {
        const {username, password} = req.body;
        if (!username && !password) {
            res.status(400).send('No valid credentials found')
            return
        }

        const hash = crypto.createHmac('sha256', config.jwtSecret).update(password).digest('hex');
        console.log(hash)
        getMongoManager().findOne(User, {username, password: hash}).then((doc) => {
            if (doc) {
                console.log('Found User')

                // Return jwt token
                const payload = {
                    uid: doc.uid,
                    isInstructor: false
                };
                const token = jwt.encode(payload, config.jwtSecret)
                res.json({
                    token: token
                });
            } else {
                res.status(400).send('Authentcation failed');
            }
        });
    }

    public static logout(req, res) {
        res.send();
    }

    public static async createUser(req, res) {
        const {username, firstname, lastname, email, password, isInstructor, uid} = req.body

        if (!username || !firstname || !lastname || !email || !password || !isInstructor || !uid) {
            res.status(400).send('Missing information');
            return;
        }

        // Check whether user exists
        getMongoManager().findOne(User, {where: {$or: [{username}, {email}, {uid}]}})
        .then((doc) => {
            if (!doc) {
                const hash = crypto.createHmac('sha256', config.jwtSecret)
                .update(password)
                .digest('hex');
                const newUser = {
                    username,
                    firstname,
                    lastname,
                    email,
                    password: hash,
                    isInstructor,
                    uid,
                    enrolledCourses: new Array()
                };

                getMongoManager().insertOne(User, newUser)
                .then(() => console.log('User created'))
                .catch((err) => {console.log(err); });

                /* When user is created, a user profile should be created as well*/
                UserProfileController.createUserProfile(newUser).then((r)=>{
                    console.log(r)
                    res.status(200).send('User created')
                });
            } else {
                res.status(400).send('User already exists');
            }
        });
    }

    public static async getUser(req, res) {
        const token: string = req.body.token || req.headers['token'] || req.headers['x-access-token'];
        if (!token) {
            return res.status(400).send('Auth token missing')
        }

        const user = await AuthController.VerifyToken(token)
        if (!user) {
            return res.status(400).send('Invalid auth token')
        }

        console.log('User identified: ', user.uid)

        getMongoManager().findOne(UserProfile, {uid: user.uid})
        .then((profile)=>{
            console.log(profile);
            res.json(profile);
        });
    }

    public static async getUserByUID(uid: string) {
        return await getMongoManager().findOne(User, {uid});
    }
}
