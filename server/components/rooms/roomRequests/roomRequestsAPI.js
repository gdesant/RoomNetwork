const express = require('express');
const router = express.Router();
const roomRequestsController = require("./roomRequestsController");
const jwt =require('jsonwebtoken')
const auth = require('../../authFunc')

router.get("/", async function(req, res) {
    let result = await roomRequestsController.getRooms();
    res.send(result);
});

router.get("/id/:id", async function(req, res) {
    let result = await roomRequestsController.getRoomById(req.params.id);
    res.send(result);
});

router.post("/changeStatus", auth.authenticateToken, async function(req, res) {
    console.log('Access Register !')
    let result = await roomRequestsController.changeMemberStatus(req.body);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 401) {
        res.status(result).send('You are not authorized to do that !')
    } else {
        res.send(result);
    }
});

router.post("/create", auth.authenticateToken, async function(req, res) {
    console.log('Access Register !')
    let result = await roomRequestsController.createRoom(req.body, req.user);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

module.exports = router;