const express = require('express');
const router = express.Router();
const messageController = require("./messageController");
const jwt =require('jsonwebtoken')
const io = require('../../server')
const auth = require('../authFunc')

router.get("/", async function(req, res) {
    let result = await messageController.getMessages();
    res.send(result);
});

router.get("/id/:id", async function(req, res) {
    let result = await messageController.getMessageById(req.params.id);
    res.send(result);
});

router.get("/room/:id", async function(req, res) {
    let result = await messageController.getMessagesByRoomId(req.params.id);
    res.send(result);
});

router.get("/user/:id", async function(req, res) {
    let result = await messageController.getMessagesBySenderId(req.params.id);
    res.send(result);
});

router.post("/create", auth.authenticateToken, async function(req, res) {
    console.log('Access Register !')
    let result = await messageController.createMessage(req.body, req.userId, req.roomId);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Error 409')
    } else {
        res.send(result);
    }
});


module.exports = router;