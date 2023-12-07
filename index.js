const express = require("express");
const cors = require('cors');
const app = express();
const api = require('./API/index');
const errorHandler = require("./API/middlewares/error-handler");

app.use((req, res, next) => {
    console.log(req.url);
    next();
});
app.use(cors());
app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

app.use('/api/v1', api);

app.use(errorHandler);

app.listen(3001, () => {
    console.log("listening on http://localhost:3001");
})