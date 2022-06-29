const express = require('express');
const router = express.Router();
const usersController = require("./usersController");

router.get("/", async function(req, res) {
    let result = await usersController.getUsers();
    res.send(result);
});

router.get("/all/sw/:name/:id?", async function(req, res) {
    if (!req.params.id)
        return await usersController.getUsersStartWith(req.params.name, null);

    let  user  =  await usersController.getUserById(req.params.id,   ['id'])
    let  ids =  await user.getStartWith()
    let  result = await usersController.getUsersStartWith(req.params.name, ids);
    res.send(result);
});

router.get("/un/:id", async function(req, res) {
    let result = await usersController.getUserById(req.params.id, ['username']);
    res.send(result.username);
});

router.get("/:id", async function(req, res) {
    let result = await usersController.getUserById(req.params.id, ['id', 'username', 'pp_url', 'pp_settings']);
    res.send(result);
});

router.get("/tk/:token", async function(req, res) {
    let result = await usersController.getUserByToken(req.params.token, ['id', 'username' ,'email', 'publicAccount', 'publicEmail']);
    res.send(result);
});

module.exports = router;