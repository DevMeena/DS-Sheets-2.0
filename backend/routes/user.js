const express = require("express");
const router = express.Router()
const {getUserById, totalUsers, submit, solvedCount, count, resetProgress, deleteUser, resetListProgress} = require("../controllers/user")
const { isAuthenticated, isSignedIn } = require("../controllers/auth");

router.param("uid", getUserById)

router.get('/users', totalUsers)
router.post('/submit', submit)
router.get('/count/:lid', count)
router.get('/solved-count/:uid/:lid',isSignedIn, isAuthenticated, solvedCount)
router.delete('/reset-progress/:uid',isSignedIn, isAuthenticated, resetProgress)
router.delete('/delete-user/:uid',isSignedIn, isAuthenticated, deleteUser)
router.delete('/reset-progress/:uid/:lid',isSignedIn, isAuthenticated, resetListProgress)

module.exports = router