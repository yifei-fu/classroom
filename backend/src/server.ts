import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as express from 'express';

// get configurations from environment variables
const port: number = Number(process.env.PORT) || 8080;

const app = express();

// initialize middleware
app.use(bodyParser.json());
app.use(compression());

// route API endpoints
app.get('/', (req, res) => {
    res.send('ok');
});

// start Express app
app.listen(port, () => {
    console.log(`App is running on port ${port}.`);
});
