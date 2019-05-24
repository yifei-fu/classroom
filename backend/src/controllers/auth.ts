import * as passport from 'passport';
import * as passportJWT from 'passport-jwt';
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
                    uid: user.uid
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