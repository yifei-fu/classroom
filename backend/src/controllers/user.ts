import {getMongoManager} from 'typeorm';
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
                    isInstructor: doc.isInstructor
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
        console.log(req.body)
        const {username, firstName, lastName, email, password, isInstructor, uid} = req.body

        if (!username || !firstName || !lastName || !email || !password || !uid) {
            return res.status(400).send('Missing information');
        }

        // Check whether user exists
        getMongoManager().findOne(User, {where: {$or: [{username}, {email}, {uid}]}})
        .then((doc) => {
            if (!doc) {
                const hash: string = crypto.createHmac('sha256', config.jwtSecret)
                .update(password)
                .digest('hex');

                // Validate isInstructor
                let instructorBool: boolean;
                if (isInstructor == false){
                    instructorBool = false;
                } else if (isInstructor == true){
                    console.log('Instructor detected')
                    instructorBool = true;
                } else {
                    return res.status(400).send('isInstructor param has unknown value');
                }

                const newUser = {
                    username,
                    firstName,
                    lastName,
                    email,
                    password: hash,
                    isInstructor: instructorBool,
                    uid,
                    enrolledCourses: new Array()
                };

                getMongoManager().insertOne(User, newUser)
                .then(() => console.log('User created'))
                .catch((err) => {console.log(err); });

                /* When user is created, a user profile should be created as well*/
                UserProfileController.createUserProfile(newUser).then((r)=>{
                    console.log(r.ops)
                    // Return jwt token
                    const payload = {
                        uid: newUser.uid,
                        isInstructor: newUser.isInstructor
                    };
                    const token = jwt.encode(payload, config.jwtSecret)
                    res.json({token: token});
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
