const {db} = require("../models/db")

exports.allLists = async (req, res) => {

    // console.log("it ran");

    // console.log(req);
    // console.log(req.profile);
    // console.log(req.user);
    // console.log(req.auth);

    await db.query("SELECT * FROM lists",(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Error in fetching lists!"
            })
        } else {
            if(doc.length){
                // console.log(doc);
                return res.status(200).json(doc)
            } else {
                console.log(err);
                return res.status(401).json({
                    err: "failed to fetch lists"
                })
            }
        }
    })
}

exports.getList = async (req, res) => {

    // console.log("it ran");

    var listId = req.params.listId;

    await db.query("SELECT * FROM lists WHERE id = ?",[listId],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Error in fetching list!"
            })
        } else {
            if(doc.length){
                // console.log(doc);
                return res.status(200).json(doc)
            } else {
                console.log(err);
                return res.status(400).json({
                    err: "failed to fetch list"
                })
            }
        }
    })
}

exports.listQuests = async (req, res) => {

    // console.log("it ran");

    var listId = req.params.listId;
    console.log(listId);


    await db.query("SELECT * FROM quests WHERE listId = ?",[listId],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Error in fetching quests!"
            })
        } else {
            if(doc.length){
                console.log("QUESTS");
                console.log(doc);
                return res.status(200).json(doc)
            } else {
                console.log(err);
                return res.status(400).json({
                    err: "failed to fetch quests"
                })
            }
        }
    })
}

exports.userListQuests = async (req, res) => {

    // console.log("it ran");

    var listId = req.params.listId;
    var userId = req.params.uid;
    var topicId = req.params.topicId;

    console.log(listId);
    console.log(userId);
    console.log(topicId);

    let values = [userId, listId]

    let query = `SELECT q.id, s.UID, q.name, q.link, q.listId, q.topicId,COALESCE(s.fav, 0) as favourite,COALESCE(s.sol, 0) as solved 
    FROM dsadb.quests q 
    LEFT JOIN dsadb.solved s 
    ON q.id = s.QID && s.UID = ? WHERE q.listId = ?`

    if(topicId !== "all") {
        console.log("TOPIC SPECIFIC");
        query += " && topicId = ?"
        values = [userId, listId, topicId]
        console.log(values);
    }

    await db.query(query,values,(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Error in fetching quests!"
            })
        } else {
            if(doc.length){
                console.log(doc);
                return res.status(200).json(doc)
            } else {
                console.log(err);
                return res.status(400).json({
                    err: "failed to fetch quests"
                })
            }
        }
    })
}