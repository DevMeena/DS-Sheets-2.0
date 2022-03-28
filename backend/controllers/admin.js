const {db} = require("../models/db")
const { v4: uuidv4 } = require('uuid');


const urlPatternValidation = URL => {
    const regex = new RegExp('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');    
    return regex.test(URL);
};

exports.addList = async (req, res) => {

    const id = uuidv4()
    console.log(req.body);
    const name = req.body.name
    const author = req.body.author
    const description = req.body.description

    await db.query("INSERT INTO lists (id, name, author, description) VALUES (?,?,?,?)",[id,name,author,description],(err,doc)=>{
        if(err){
            return res.status(400).json({
                message: "error in adding new list!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully added new list!"
            })
        }

    })
}


exports.addTopic = async (req, res) => {

    console.log(req.body);
    
    const id = uuidv4()
    const name = req.body.name

    await db.query("INSERT INTO topics (id, name) VALUES (?,?)",[id,name],(err,doc)=>{
        if(err){
            return res.status(400).json({
                message: "Error in adding new Topic!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "Successfully added new Topic!"
            })
        }

    })
}

exports.addQuest = async (req, res) => {

    // console.log("it is runnign");

    const id = uuidv4()
    console.log(req.body);
    const name = req.body.name
    const link = req.body.link
    const listId = req.body.listId
    const topicId = req.body.topicId


    if(!urlPatternValidation(link)){
        return res.status(400).json({
            message: "Invalid URL!"
        })
    }

    await db.query("INSERT INTO quests (id, name, link, listId, topicId) VALUES (?,?,?,(SELECT id FROM lists WHERE name = ?),(SELECT id FROM topics WHERE name = ?))",[id, name, link, listId, topicId],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in adding new Quest!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully added new Quest!"
            })
        }

    })
}

exports.editList = async (req, res) => {

    const values = req.body
    const listId = req.params.listId
    console.log(listId);
    const updateValues = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != ""));
    console.log("updated values", updateValues);

    await db.query("UPDATE lists SET ? WHERE id = ?",[updateValues,listId],(err,doc)=>{
        if(err){
            return res.status(400).json({
                message: "error in updating list!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully updated list!"
            })
        }

    })
}

exports.editTopic = async (req, res) => {

    const values = req.body
    const topicId = req.params.topicId
    console.log(topicId);
    const updateValues = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != ""));
    console.log(values);
    console.log("updated values", updateValues);

    await db.query("UPDATE topics SET ? WHERE id = ?",[updateValues,topicId],(err,doc)=>{
        if(err){
            return res.status(400).json({
                message: "error in updating topic!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully updated topic!"
            })
        }

    })
}

exports.editQuest = async (req, res) => {
    
    const values = req.body

    if(req.body.link.length > 0){
        if(!urlPatternValidation(req.body.link)){
            return res.status(400).json({
                message: "Invalid URL!"
            })
        }
        console.log(req.body);
    }

    const questId = req.params.questId
    console.log(questId);
    const updateValues = Object.fromEntries(Object.entries(values).filter(([_, v]) => v != ""));
    console.log(values);
    console.log("updated values", updateValues);

    await db.query("UPDATE quests SET ? WHERE id = ?",[updateValues,questId],(err,doc)=>{
        if(err){
            return res.status(400).json({
                message: "error in updating question!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully updated question!"
            })
        }

    })
}

exports.deleteList = async (req, res) => {

    const listId = req.params.listId
    console.log(listId) 

    await db.query("DELETE FROM lists WHERE id = ?",[listId],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in deleting list!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully deleted list!"
            })
        }

    })
}

exports.deleteTopic = async (req, res) => {

    const topicId = req.params.topicId
    console.log(topicId) 

    await db.query("DELETE FROM topics WHERE id = ?",[topicId],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in deleting topic!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully deleted topic!"
            })
        }

    })
}

exports.deleteQuest = async (req, res) => {

    const questId = req.params.questId
    console.log(questId) 

    await db.query("DELETE FROM quests WHERE id = ?",[questId],(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                message: "error in deleting question!"
            })
        } else {
            console.log(doc);
            return res.status(200).json({
                message: "successfully deleted question!"
            })
        }

    })
}