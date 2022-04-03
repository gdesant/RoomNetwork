const express = require('express');
const router = express.Router();
const usersController = require("./usersController");

router.get("/", async function(req, res) {
    let result = await usersController.getUsers();
    res.send(result);
});

router.get("/all/sw/:name/:id", async function(req, res) {
    let result = await usersController.getUsersStartWith(req.params.name, req.params.id);
    res.send(result);
});

router.get("/un/:id", async function(req, res) {
    let result = await usersController.getUserById(req.params.id, ['username']);
    res.send(result.username);
});

router.get("/:id", async function(req, res) {
    let result = await usersController.getUserById(req.params.id, ['id', 'username' ,'email']);
    res.send(result);
});

router.get("/tk/:token", async function(req, res) {
    let result = await usersController.getUserByToken(req.params.token, ['id', 'username' ,'email', 'publicAccount', 'publicEmail']);
    res.send(result);
});

module.exports = router;