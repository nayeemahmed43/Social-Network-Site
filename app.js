const express = require("express");
const app = express();
const path = require("path");
const connectDB = require("./DB/connection");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const fs = require("fs");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const morgan = require("morgan");

//db
connectDB();

//bring in routes
const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

// //apiDocs
// app.get("/", (req, res) => {
// fs.readFile("docs/apiDocs.json", (err, data) => {
// if (err) {
// res.status(400).json({
// error: err
// });
// }
// const docs = JSON.parse(data);
// res.json(docs);
// });
// });

//middleware
app.use(morgan("dev"));
app.use(expressValidator());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use("/", postRoutes);
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use(function(err, req, res, next) {
if (err.name === "UnauthorizedError") {
res.status(401).json({ error: "Unauthorized Access !!" });
}
});

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('react-front/build'));

    // app.get('*', (req,res)=>{
    //     res.sendFile(path.join(__dirname, 'react-front', 'build', 'index.html'));
    // });
}


const Port = process.env.PORT || 8080;
app.listen(Port, () => {
console.log(`A Node Js API is listening on port: ${Port}`);
});