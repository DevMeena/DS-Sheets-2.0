const express = require("express");
const router = express.Router()
const {allTopics} = require("../controllers/topics")

router.get('/topics', allTopics)
module.exports = router