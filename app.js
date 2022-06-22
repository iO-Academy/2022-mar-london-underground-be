const express = require('express');
const router = require('./config/routes');
const cors = require('cors');
const app = express();

const port = 3001;

app.use(cors());

app.use(express.json());

//Add all routes to app
router(app);

app.listen(port, () => {
    console.log(`App running, listening on port ${port}`);
});