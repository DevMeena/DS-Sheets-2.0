const {db} = require("../models/db")

exports.allTopics = async (req, res) => {

    await db.query("SELECT * FROM topics",(err,doc)=>{
        if(err){
            console.log(err);
            return res.status(400).json({
                err: "Error in fetching topics!"
            })
        } else {
            if(doc.length){
                // console.log(doc);
                return res.status(200).json(doc)
            } else {
                console.log(err);
                return res.status(400).json({
                    err: "failed to fetch topics"
                })
            }
        }
    })
}