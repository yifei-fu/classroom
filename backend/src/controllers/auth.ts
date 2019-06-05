import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
import * as jwt from 'jwt-simple';
import {Config} from '../config';
import {UserController} from './user';

const config: Config = require('../config.json')

const ExtractJwt = passportJWT.ExtractJwt;  
const Strategy = passportJWT.Strategy;

const params = {  
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export function auth() {  
    const strategy = new Strategy(params, (payload, done) => {
        let user = UserController.getUserByUID(payload.uid);
        user.then((user) => {
            if (user != null) {
                return done(null, {
                    uid: user.uid,
                    isInstructor: user.isInstructor
                });
            } else {
                return done(new Error("User not found"), null);
            }
        });
    });

    passport.use(strategy);

    return {
        initialize: function() {
            return passport.initialize();
        },
        authenticate: function() {
            return passport.authenticate("jwt", {jwtSession: config.jwtSession});
        }
    };
};

export class AuthController {
    public static VerifyToken(token: string) {
        const decode = jwt.decode(token, config.jwtSecret)
        const uid = decode.uid
        return UserController.getUserByUID(uid)
    }
}
