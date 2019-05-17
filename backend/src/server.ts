import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import {createConnection, ConnectionOptions} from 'typeorm';
import 'reflect-metadata'
import {equal} from 'assert'
import {User} from './entity/User'

// get configurations from environment variables
const port: number = Number(process.env.PORT) || 8080;
const urlencodedParser = bodyParser.urlencoded({ extended: true });

const options: ConnectionOptions = {
    "type": 'mongodb',
    entities: [User]
}

createConnection(options).then(connection => {
    let user = new User()
    user.firstName = 'test'
    user.lastName = 'test'

    let usersRepository = connection.getRepository(User)

    usersRepository
    .save(user)
    .then(user=> console.log("User has been saved: ", user))
    .catch(error => console.log("Cannot save. Error: ", error))

}).catch(err => {
    console.log(err)
    process.exit(1)
});

const app = express();

// initialize middleware
app.use(bodyParser.json());
app.use(compression());

// route API endpoints
app.get('/healthcheck', (req, res) => {
    res.send();
});

app.post('/user', urlencodedParser, (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    let query = { username: username };

});

// start Express app
app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});
