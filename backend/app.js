// require('dotenv').config()

const express = require("express")
const bodyParser = require("body-parser")
const mysql = require("mysql")
const cookieParser = require("cookie-parser")
const cors = require("cors")

// ! My Routes

const authRoutes = require("./routes/auth")
const userRoutes = require("./routes/user")
const listRoutes = require("./routes/lists")
const topicRoutes = require("./routes/topics")
const adminRoutes = require("./routes/admin")

const app = express()
const port = process.env.PORT || 8000

// ! DB Connection

// const mysql = require("mysql")

// const db = mysql.createConnection({
//     user: "root",
//     host: "localhost",
//     password: "password",
//     database: "dsaDB"
// })

// we use these as middleware

app.use(bodyParser.json());    
app.use(cookieParser());    
app.use(cors());

// Routes

app.use("/api", authRoutes)
app.use("/api", userRoutes)
app.use("/api", listRoutes)
app.use("/api", adminRoutes)
app.use("/api", topicRoutes)

// app.post("/api/signup",(req,res)=>{
//     console.log(req.body);

//     const id = "klasdjfkajf392u4fd92jhfalkwjdwf"
//     username = req.body.username
//     password = req.body.password

//     db.query("INSERT INTO users (id, username, password) VALUES (?,?,?)",[id,username,password],(err,res)=>{
//         if(err){
//             console.log(err);
//         } else {
//             console.log(res);
//         }
//     })
//     // .then((res)=>{
//     //     console.log("success");
//     // }).catch((err)=>{
//     //     console.log("error in insertion");
//     // })
// })

app.listen(port, () => {
    console.log(`App is running a ${port}`);
})