const express = require("express");
const { isAuthenticated, isSignedIn } = require("../controllers/auth");
const router = express.Router()
const { allLists, getList, listQuests, userListQuests } = require("../controllers/lists");
const { getUserById } = require("../controllers/user");

router.param("uid", getUserById)

router.get('/lists', allLists)
router.get('/lists/:listId', getList)
router.get('/list/:listId', listQuests)
router.get('/:uid/list/:listId/:topicId',isSignedIn, isAuthenticated, userListQuests)

module.exports = router