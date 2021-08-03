const express = require('express');
const router = express.Router();
const friendsController = require("./friendsController");
const jwt = require('jsonwebtoken')
const usersController = require("../users/usersController");

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

router.post("/create", authenticateToken, async function(req, res) {
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

router.post("/update", authenticateToken, async function(req, res) {
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

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] ? req.headers['authorization'] : null
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = await usersController.getUserByToken(token, ['id', 'username' ,'email'])
        next()
    })
}


module.exports = router;