import {getMongoManager} from "typeorm"
import {User} from '../entity/User'

// User Controller Class
export class UserController {
    public static login(req, res, mgr) {
        let username = req.body.username;
        let password = req.body.password;
        let query = {
            username: username,
            password: password
        };
        mgr.findOne(User, query).then(doc => {
            if (doc != null) {
                /*TODO: Set browser cookie with JWT*/
                res.send('Authenticated')
                console.log()
            } else {
                res.send('Authentication failed')
            }
        });
    }

    public static logout(req, res, mgr) {
        /*TODO: Clear cookie with JWT*/
        res.send()
    }

    public static createUser(req, res, mgr) {
        let username = req.body.username
        let firstname = req.body.firstname
        let lastname = req.body.lastname
        let email = req.body.email
        let password = req.body.password
        let isInstructor = req.body.isInstructor
        let uid = req.body.uid

        /* TODO: Validate fields */

        // Check whether user exists
        let user = this.userExist(username, mgr);
        if (user != null) {
            res.send(400, 'User already exists');
        }

        let newUser = {
            username: username,
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            isInstructor: isInstructor,
            uid: uid
        };

        mgr.InserOne(User, newUser)
        .then(console.log('User created'))
        .catch(err => {console.log(err)});

        res.send(200, 'successful operation');
        /* TODO: When user is created, a user profile should be created as well 
        Call creatUserProfile()        
        */
    }
 
    public static getUser(req, res, mgr) {
        /* TODO: Implement jwt */
        // Identify user with jwt
        let username = "user"

        mgr.FindOne(User, {username: username})
        .then(doc => {
            console.log('Obtained User');
            res.send();
        })
        .catch(err => {
            console.log(err)
        });
    }

    private static userExist(username: string, mgr){
        mgr.FindOne(User, {username: username})
        .then((doc)=>{
            if (doc == null)
                return false
            return true
        });
    }
}