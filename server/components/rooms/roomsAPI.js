const express = require('express');
const router = express.Router();
const roomsController = require("./roomsController");
const jwt =require('jsonwebtoken')
const auth = require('../authFunc')

router.get("/", async function(req, res) {
    let result = await roomsController.getRooms();
    res.send(result);
});

router.get("/id/:id", async function(req, res) {
    let result = await roomsController.getRoomById(req.params.id);
    res.send(result);
});

router.get("/psn/:id1/:id2", async function(req, res) {
    let result = await roomsController.getPersonalRoom(req.params.id1, req.params.id2);
    if (result == false)
        console.log('Personal Room with user_' + req.params.id1 + ' and user_'+ req.params.id2 + " hasn't been found !")
    res.send(result);
});

router.post("/study/:id/:p1?/:p2?/:p3?", auth.authenticateToken, async function(req, res) {
    let result = await roomsController.getStudyRoom(req.params, req.body.id);
    if (result == false)
        console.log('Study Room with id' + req.params.id + ' and user_'+ req.params.id2 + " hasn't been found !")
    res.send(result);
});

router.post("/create", auth.authenticateToken, async function(req, res) {
    console.log('Access create Room !')

    let result = await roomsController.createRoom(req.body);

    if(result === 490) {
        res.status(result).send("Not enough parameters ! Can't create the room")
    } else if(result === 492) {
        res.status(result).send( "Username is already taken ! Can't create the room")
    } else if (result === 491) {
        res.status(result).send("Max number of room created reached ! Can't create the room")
    } else {
        res.send(result);
    }
});


module.exports = router;