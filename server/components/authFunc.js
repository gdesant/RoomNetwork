const usersController = require("./users/usersController");
module.exports = {
    authenticateToken: async (req, res, next) => {
        const jwt = require("jsonwebtoken");
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null || token == undefined) return res.sendStatus(401)
        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403)
            }
            req.user = user
            req.userData = await usersController.getUserByToken(token, ['id', 'username' ,'email'])
            req.token = token
            next()
        })
    },
};