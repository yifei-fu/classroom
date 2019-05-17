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
        // console.log(query)
        mgr.findOne(User, {username: username, password: password}).then(doc => {
            // console.log(doc)
            if (doc) {
                /*TODO: Set browser cookie with JWT*/
                res.send(200, 'Authenticated')
            } else {
                res.send(400, 'Authentication failed')
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
        mgr.findOne(User, {username: username})
        .then((doc)=>{
            console.log(doc)
            if (!doc) {
                let newUser = new User();
                newUser.username= username
                newUser.firstName= firstname
                newUser.lastName= lastname
                newUser.email= email
                newUser.password= password
                newUser.isInstructor= isInstructor
                newUser.uid= uid

                mgr.save(newUser)
                .then(console.log('User created'))
                .catch(err => {console.log(err)});
        
                res.send(200, 'successful operation');
            } else {
                res.send(400, 'User already exists');
            }
        });

        /* TODO: When user is created, a user profile should be created as well 
        Call creatUserProfile()        
        */
    }
 
    public static getUser(req, res, mgr) {
        /* TODO: Implement jwt */
        // Identify user with jwt
        let username = "user"

        mgr.findOne(User, {username: username})
        .then(doc => {
            console.log('Obtained User');
            res.send();
        })
        .catch(err => {
            console.log(err)
        });
    }

    private static userExist(username: string, mgr){
        mgr.findOne(User, {username: username})
        .then((doc)=>{
            console.log(doc)
            if (doc == null)
                return false
            return true
        });
    }
}