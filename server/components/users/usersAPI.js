const express = require('express');
const router = express.Router();
const usersController = require("./usersController");

router.get("/all", async function(req, res) {
    let result = await usersController.getUsers();
    res.send(result);
});

router.get("/all/sw/:name", async function(req, res) {
    let result = await usersController.getUsersStartWith(req.params.name);
    res.send(result);
});

router.get("/id/:id", async function(req, res) {
    let result = await usersController.getUserById(req.params.id);
    res.send(result);
});

router.get("/id/:id/friend", async function(req, res) {
    let result = await usersController.getFriend(req.params.id);
    res.send(result);
});

router.get("/tk/:token", async function(req, res) {
    let result = await usersController.getUserByToken(req.params.token);
    res.send(result);
});

module.exports = router;