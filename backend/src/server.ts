import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';
import {createConnection} from 'typeorm';

// get configurations from environment variables
const port: number = Number(process.env.PORT) || 8080;

createConnection({
    type: 'mongodb',
}).catch((err) => {
    console.log(err);
    process.exit(1);
});

const app = express();

// initialize middleware
app.use(bodyParser.json());
app.use(compression());

// route API endpoints
app.get('/healthcheck', (req, res) => {
    res.send();
});

// start Express app
app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});
