# London Underground
A journey planning application.

## Instuctions

Clone the repo

Create a database in mongodb called tubulardb

Create a collection called lines

Import the tubular.json in to lines

npm install

node app.js

## Testing

In postman:

localhost:3001/stations - GET

localhost:3001/journeys - POST, json body - {"selectedStartStation":"Embankment","selectedEndStation":"Westminster"}
