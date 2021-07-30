const usersDAL = require("../users/usersDAL");
const jwt = require('jsonwebtoken')

class AuthController {
    static async signup(params) {
        console.log(params);
        console.log("\tAuthController@signup");
        if(!params.username || !params.password || !params.email) return 400
        const user = await usersDAL.findOne({username: params.username})
        if(user) {
           return 409
        }

        const result = await usersDAL.create(params)
        await usersDAL.update({ token: generateAccessToken(result.username)}, {username: result.username})
        const res = await usersDAL.findOne({username: result.username})
        return {
            id: res.id,
            username: res.username,
            token: res.token
        }
    }

    static async login(params) {
        if(!params.username || !params.password) return
        console.log("\tAuthController@login name=(" + params.username +") " + "| password=("+ params.password +")");
        let user = await usersDAL.findOne({username: params.username})

        if(user) {
            if(user.password !== params.password) {
                return false
            }
            await usersDAL.update({ token: generateAccessToken(user.username)}, {username: user.username})
            user = await usersDAL.findOne({username: params.username})
            return {
                id: user.id,
                username: user.username,
                token: user.token
            }
        }

        return false
    }

    static async logout(params) {
        const token = params.token
        console.log("\rAuthController@logout");
        const user = await usersDAL.findOne({token: token})
        if(user) {
            usersDAL.update({token: null},{token: token})
            return true
        }
        return false
    }

    static async verify(params) {
        const token = params.token
        console.log("\rAuthController@verify");
        const user = await usersDAL.findOne({token: token})
        if(user) {
            if (jwt.verify(token, process.env.TOKEN_SECRET))
            return {
                id: user.id,
                username: user.username,
                token: user.token
            }
        }
        return false
    }
}

function generateAccessToken(username) {
    console.log("\rAuthController@generateToken");
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: username
    }, process.env.TOKEN_SECRET)
}

module.exports = AuthController
