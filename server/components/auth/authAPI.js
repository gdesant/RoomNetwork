const express = require('express');
const router = express.Router();
const AuthController = require("./authController");
const jwt = require('jsonwebtoken')

router.post("/register", async function(req, res) {
    console.log('Access Register !')
    console.log(req);
    let result = await AuthController.signup(req.body);
    if(result === 400) {
        res.status(result).send('Not enough parameters')
    } else if(result === 409) {
        res.status(result).send('Username is already taken')
    } else {
        res.send(result);
    }
});


router.post("/verify", authenticateToken, async function(req, res ) {
    let result = await AuthController.verify(req.body);
    if(result === 400) {
        res.status(result).send('Not enough parameters for verify')
    } else {
        res.send(result);
    }
});

router.post("/logout", authenticateToken, async function(req, res ) {
    let result = await AuthController.logout(req.body);
    if(!result) {
        res.send(false)
    } else {
        res.send(true);
    }
});

router.post("/login", async function(req, res) {
    console.log('Access Login !')
    let result = await AuthController.login(req.body);
    if (result)
        res.send(result);
    else
        res.status(404).send('Username or password is invalid')
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'] ? req.headers['authorization'] : null
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null || token == undefined) return res.sendStatus(401)
    console.log('token == ' + token)
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = router



