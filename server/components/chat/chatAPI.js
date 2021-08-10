const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const chatController = require("./chatController");

router.get("/all", async function(req, res) {
    console.log("Get Chat By ID!")
    let result = await chatController.getAll();
    res.send(result);
});

router.get("/id/:id", async function(req, res) {
    console.log("Get Chat By ID!")
    let result = await chatController.getChatById(req.params.id);
    res.send(result);
});

router.post("/create/:id", async function(req, res) {
    console.log("Create Chat !")
    let result = await chatController.create(req.params.id);
    res.send(result);
});

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
        next()
    })
}

module.exports = router



