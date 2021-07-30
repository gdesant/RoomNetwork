const express = require('express');
const router = express.Router();
const friendsController = require("./friendsController");
const jwt = require('jsonwebtoken')

router.get("/all", async function(req, res) {
    let result = await friendsController.getFriendsRequests();
    res.send(result);
});

router.get("/id/:id", async function(req, res) {
    let result = await friendsController.getFriendRequestById(req.params.id);
    res.send(result);
});

router.get("/sender/:id", async function(req, res) {
    let result = await friendsController.getFriendRequestsBySender(req.params.id);
    res.send(result);
});

router.get("/receiver/:id", async function(req, res) {
    let result = await friendsController.getFriendRequestsByReceiver(req.params.id);
    res.send(result);
});

router.post("/create", authenticateToken, async function(req, res) {
    console.log('Access Register !')
    let result = await friendsController.createFriendRequest(req.user, req.receiver);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

router.post("/update", authenticateToken, async function(req, res) {
    console.log('Access Update !')
    let result = await friendsController.updateFriendRequest(req.body);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

router.post("/cancel", authenticateToken, async function(req, res) {
    console.log('Access Update !')
    let result = await friendsController.cancelFriendRequest(req);
    res.send(result);
});

router.post("/refuse", authenticateToken, async function(req, res) {
    console.log('Access Update !')
    let result = await friendsController.refuseFriendRequest(req);
    res.send(result);
});

router.post("/approve", authenticateToken, async function(req, res) {
    console.log('Access Update !')
    let result = await friendsController.approveFriendRequest(req);
    res.send(result);
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