const express = require("express");
const router = express.Router()
const { addList, addTopic, addQuest, editList, editTopic, editQuest, deleteList, deleteQuest, deleteTopic } = require("../controllers/admin");
const { isAdmin, isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

router.param("uid", getUserById)

router.post('/admin/:uid/add-list', isSignedIn, isAuthenticated, isAdmin, addList)
router.post('/admin/:uid/add-topic', isSignedIn, isAuthenticated, isAdmin, addTopic)
router.post('/admin/:uid/add-quest', isSignedIn, isAuthenticated, isAdmin, addQuest)
router.patch('/admin/:uid/edit-list/:listId', isSignedIn, isAuthenticated, isAdmin, editList)
router.delete('/admin/:uid/delete-list/:listId', isSignedIn, isAuthenticated, isAdmin, deleteList)
router.patch('/admin/:uid/edit-topic/:topicId', isSignedIn, isAuthenticated, isAdmin, editTopic)
router.delete('/admin/:uid/delete-topic/:topicId', isSignedIn, isAuthenticated, isAdmin, deleteTopic)
router.patch('/admin/:uid/edit-quest/:questId', isSignedIn, isAuthenticated, isAdmin, editQuest)
router.delete('/admin/:uid/delete-quest/:questId', isSignedIn, isAuthenticated, isAdmin, deleteQuest)


module.exports = router