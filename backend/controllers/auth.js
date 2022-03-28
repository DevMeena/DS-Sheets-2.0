// const { validationResult } = require("express-validator")
const {db} = require("../models/db")
const { v4: uuidv4 } = require('uuid');
const jwt = require("jsonwebtoken")
const expressJwt = require("express-jwt")
const bcrypt = require("bcrypt")
const { validationResult } = require("express-validator")

exports.signup = async (req, res) => {

    const id = uuidv4()
    const username = req.body.username
    const password = req.body.password
    const hashedPassword = await bcrypt.hash(password,10);

    if(username.length < 3 || username.length > 12){
        return res.status(400).json({
            err: "username should be 3 to 12 characters long"
        })
    }

    if(password.length < 6 || password.length > 12) {
        return res.status(400).json({
            err: "password should be 6 to 12 characters long"
        })
    }
    

    await db.query("SELECT * FROM users WHERE username = ?",[username], async (err,doc)=>{
        
        if(err){
            console.log("Error")
        }

        if(doc.length){
            console.log(doc.length);
            console.log("USER ALREADY EXISTS");
            return res.status(400).json({
                err: "user with this username already exists"
            })
        } else {

            await db.query("INSERT INTO users (id, username, password) VALUES (?,?,?)",[id,username,hashedPassword],(err,doc)=>{
            if(err){
                return res.status(400).json({
                    err: "not able to save user in DB"
                })
            } else {
                console.log(doc);
                return res.json({
                    username: username,
                    id: id,
                })
            }
        })
        }
    })

    

}

exports.signin = async (req, res) => {
    
    console.log(req.body);

    const username = req.body.username
    const password = req.body.password

    await db.query("SELECT * FROM users WHERE username = ?",[username], async (err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Incorrect Credentials!"
            })
        } else {
            if(doc.length){
                console.log(doc[0].password)
                const match = await bcrypt.compare(password, doc[0].password)
                if(match) {
                    console.log(match);
                    const token = jwt.sign({_id: doc[0].id}, "SECRET")
                    res.cookie("token", token, {expire: new Date() + 9999})
                    const user = doc[0]
                    console.log(user);
                    // req.profile = user
                    const id = user.id
                    const username = user.username
                    const isAdmin = user.admin
            
                    return res.status(200).json({token, user: {id, username, isAdmin} })
                } else {
                    return res.status(401).json({
                        err: "Email and password don't match"
                    })
                }
            } else {
                return res.status(401).json({
                    err: "Incorrect Credentials"
                })
            }
        }
    })

}


exports.signout = (req, res) => {
    
    res.clearCookie("token")
    
    res.json({
        message: "signout success"
    })
}

// ! Currently not used (Use Them these are important)
// protected routes

exports.isSignedIn = expressJwt({
    secret: "SECRET",
    userProperty: "auth",
    algorithms: ['HS256']
})


// custom middlewares 

exports.isAuthenticated = (req, res, next) => {
    console.log("HIII");
    // console.log("is Auth check");
    // let checker = req.profile && req.auth && req.profile._id == req.auth._id
    // console.log(checker);
    // if(!checker){
    //     console.log("failure");
    // } else {
    //     console.log("success");
    // }

    console.log("called");

    console.log(req.auth);
    console.log(req.profile);
    
    let checker = req.profile && req.auth && req.profile.id == req.auth._id // should be double equals not triple

    if(!checker) {
        return res.status(403).json({
            error: "ACCESS DENIED"
        })
    }

    next()
}

exports.isAdmin = (req, res, next) => {
    console.log("isAdmin check");
    if(req.profile.role === 0) {
        return res.status(403).json({
            error: "You are not Admin"
        })
    }
    next()
}