let apiRoutes = require("./src/apiRoutes");
let bodyParser = require("body-parser");
let cors = require('cors')
let express = require("express");
let mongoose = require("mongoose");
require('dotenv').config();

let app = express();
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
);
var db = mongoose.connection;
console.log(
    (!db) 
        ? "Error connecting database"
        : "Database connected successfully"
);

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});

app.get("/", (req, res) => {
    console.log("/ path called");
    res.send("Hello World")
});
app.use("/api", apiRoutes);

var port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log("Running simplenoteapp on port " + port);
});

module.exports = app;
