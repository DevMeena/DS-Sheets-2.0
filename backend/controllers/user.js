// const e = require("express");
// const { query } = require("express");
const {db} = require("../models/db")

exports.getUserById = async (req, res, next, id) => {

    console.log("get user by id");

    await db.query("SELECT * FROM users WHERE id = ?",[id],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Error in fetching Count!"
            })
        } else {
            // if(doc.length){
            //     return res.status(200).json({
            //         userCount: doc[0].userCount
            //     })
            // } else {
            //     return res.status(401).json({
            //         err: "failed to fetch user Count"
            //     })
            // }
            const user = doc[0];
            delete user.password;
            req.profile = user

            console.log(user);

            next()
        }
    })

}

exports.totalUsers = async (req, res) => {

    await db.query("SELECT COUNT(*) as userCount FROM users",(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Error in fetching Count!"
            })
        } else {
            if(doc.length){
                return res.status(200).json({
                    userCount: doc[0].userCount
                })
            } else {
                return res.status(401).json({
                    err: "failed to fetch user Count"
                })
            }
        }
    })
}

exports.submit = async (req, res) => {

    let query = `
    INSERT INTO dsadb.solved (UID, QID, sol, fav) VALUES (?,?,?,?)
    ON DUPLICATE KEY UPDATE
    `
    // sol = VALUES(sol),
    // fav = VALUES(fav)

    const submission = req.body

    console.log("THIS IS SUBMISSION!!!!!!!!!!!!");
    console.log(req.body);

    let sol = 0
    let fav = 0
    const UID = submission.uid
    const QID = submission.qid

    if (submission.sol){
        sol = 1
        query += " sol = VALUES(sol)"
        
    } else if (submission.unsol) {
        sol = 0
        query += " sol = VALUES(sol)"

    } else if (submission.fav) {
        fav = 1
        query += " fav = VALUES(fav)"


    } else if (submission.unfav) {
        fav = 0
        query += " fav = VALUES(fav)"
    } else {
        // 
    }

    await db.query(query,[UID,QID,sol,fav],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in submitting question!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully submitted question!"
            })
        }

    })
}



exports.solvedCount = async (req, res) => {

    let query = `
    SELECT COUNT(*) as Count FROM dsadb.solved s, dsadb.quests q
    WHERE s.QID = q.id AND s.UID =  ? && s.sol = 1 && q.listId = ?
    `
    // console.log(req.body);

    const UID = req.params.uid
    const LID = req.params.lid

        await db.query(query,[UID,LID],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in counting number of solved questions!",
                count: 0
            })
        } else {
            console.log("solved count", doc[0].Count);
            return res.status(200).json({
                message: "successfully counted number of solved questions!",
                count: doc[0].Count
            })
        }

    })
}

exports.count = async (req, res) => {

    let query = `
    SELECT COUNT(*) as Count FROM dsadb.quests
    WHERE listId = ?
    `
    // console.log(req.body);

    // const UID = req.body.uid
    const LID = req.params.lid

        await db.query(query,[LID],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in counting number of questions!",
                count: 0
            })
        } else {
            console.log(doc[0].Count);
            return res.status(200).json({
                message: "successfully counted number of questions!",
                count: doc[0].Count
            })
        }

    })
}

exports.resetProgress = async (req, res) => {

    const uid = req.params.uid

    await db.query("DELETE FROM dsadb.solved WHERE UID = ?",[uid],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in reseting progress!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "progress reset successful!"
            })
        }

    })
}

exports.deleteUser = async (req, res) => {

    const uid = req.params.uid

    console.log("user id is : " , uid);

    // console.log(req);

    await db.query("DELETE FROM dsadb.users WHERE id = ?",[uid],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in deleting user!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "user successfully deleted!"
            })
        }

    })
}

exports.resetListProgress = async (req, res) => {

    const uid = req.params.uid
    const lid = req.params.lid

    await db.query("DELETE FROM dsadb.solved WHERE UID = ? && QID IN (SELECT id FROM dsadb.quests WHERE listId = ?)",[uid,lid],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in reseting list progress!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "progress reset list successful!"
            })
        }

    })
}