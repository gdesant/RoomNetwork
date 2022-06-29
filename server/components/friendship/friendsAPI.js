const express = require('express');
const router = express.Router();
const friendsController = require("./friendsController");
const jwt = require('jsonwebtoken')
const usersController = require("../users/usersController");
const   auth  =  require('../authFunc')

router.get("/all", async function(req, res) {
    let result = await friendsController.getFriendsRequests();
    res.send(result);
});

router.get("/link/:id1/:id2", async function(req, res) {
    let result = await friendsController.getUserAreLinked(req.params.id1, req.params.id2);
    res.send({ link: result});
});

router.get("/:id", async function(req, res) {
    let result = await friendsController.getFriendRequestById(req.params.id);
    res.send(result);
});

router.get("/friend/:id", async function(req, res) {
    let result = await friendsController.getFriendById(req.params.id);
    res.send(result);
});

router.post("/delete", auth.authenticateToken, async function(req, res) {
    console.log('Access Register !')
    let result = await friendsController.cancelFriendRequest(req);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

router.post("/create", auth.authenticateToken, async function(req, res) {
    console.log('Access Register !')
    let result = await friendsController.createFriendRequest(req);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

router.post("/update", auth.authenticateToken, async function(req, res) {
    console.log('Access Update !')
    let result = await friendsController.updateFriendRequest(req);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

module.exports = router;