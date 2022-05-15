const express = require('express');
const router = express.Router();
const authController = require("./authController");
const jwt = require('jsonwebtoken')
const usersController = require("../users/usersController");
const friendsController = require("../friendship/friendsController");
const messagesController = require("../message/messageController");
const io = require('../socketio').get()

//#region Messages

router.post("/msg/new", async function(req, res) {
    let result = await messagesController.createMessage(req.body);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        console.log('New Messages :')
        io.sockets.in('room_'+ result.dataValues.roomId.toString()).emit('newMessage', {messageId: result.dataValues.id})
        res.send(result);
    }
});

router.post("/msg/neR", async function(req, res) {
    let result = await messagesController.createRoomAndMessage(req.body);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

//#endregion


//#region Users
//Private users data
router.get("/users/dash/:id", async function(req, res) {
    let result = await usersController.getUserDashboardById(req.params.id);
    res.send(result);
});

router.get("/users/:id", authenticateToken, async function(req, res) {
    let result = await usersController.getUserById(req.params.id, ['id', 'username' ,'email']);
    res.send(result);
});

router.get("/users/:id/friends", authenticateToken, async function(req, res) {
    let result = await usersController.getUserFriends(req.params.id);
    res.send(result);
});

router.get("/users/:id/friendsent", authenticateToken, async function(req, res) {
    const result = await friendsController.getUserFriendRequestsSent(req.params.id);
    res.send(result);
});

router.get("/users/:id/friendreceived", authenticateToken, async function(req, res) {
    const result = await friendsController.getUserFriendRequestsReceived(req.params.id);
    res.send(result);
});

router.get('/users/:id/friendreceived/:status', authenticateToken, async function(req, res)  {
    const result = await friendsController.getUserFriendRequestsReceivedbyStatus(req.params.id, req.params.status);
    res.send(result);
})


//Login/Register api
router.post("/register", async function(req, res) {
    console.log('Access Register !')
    console.log(req);
    let result = await authController.signup(req.body);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

router.post("/update/:id", authenticateToken, async function(req, res) {
    console.log('Access Update !')
    console.log(req);
    req.body.id = req.params.id
    let result = await authController.update(req.body);
    if(result === 407) {
        res.status(result).send('Username has not been found')
    }else if(result === 408) {
        res.status(result).send('Email is already taken')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});

router.get("/verify", authenticateToken, async function(req, res ) {
    let result = await authController.verify(req);
    res.send(result);
});

router.post("/logout", authenticateToken, async function(req, res ) {
    let result = await authController.logout(req.body);
    if(!result) {
        res.send(false)
    } else {
        res.send(true);
    }
});

router.post("/login", async function(req, res) {
    console.log('Access Login !')
    let result = await authController.login(req.body);
    if (result)
        res.send(result);
    else
        res.status(404).send('Username or password is invalid')
});
//#endregion

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null || token == undefined) return res.sendStatus(401)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err)
            return res.sendStatus(403)
        }
        req.user = user
        req.token = token
        next()
    })
}

module.exports = router



