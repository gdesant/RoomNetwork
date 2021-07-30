const express = require('express');
const router = express.Router();
const roomsController = require("./roomsController");
const jwt =require('jsonwebtoken')

router.get("/", async function(req, res) {
    let result = await roomsController.getRooms();
    res.send(result);
});

router.get("/id/:id", async function(req, res) {
    let result = await roomsController.getRoomById(req.params.id);
    res.send(result);
});

router.post("/create", authenticateToken, async function(req, res) {
    console.log('Access Register !')
    let result = await roomsController.createRoom(req.body, req.user);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] ? req.headers['authorization'] : null
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}


module.exports = router;