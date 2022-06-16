const express = require('express');
const router = require('./config/routes');

const app = express();

const port = 3001;

//if the content type of the request is json, parse it and put it in the property req.body
app.use(express.json());

//Add all routes to app
router(app);

app.listen(port, () => {
    console.log(`App running, listening on port ${port}`);
});