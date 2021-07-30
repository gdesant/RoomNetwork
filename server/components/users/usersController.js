const usersDAL = require("./usersDAL");

class UsersController {
    static async getUsers() {
        console.log("\tUserController@getUsers");
        const Users = await usersDAL.get();
        Users.sort((e1, e2) => e1.email < e2.email);
        Users.forEach(function (user){user.password=null;user.token =null})
        return Users;
    }

    static async getUsersStartWith(name) {
        console.log("\tUserController@findStartWith");
        const Users = await usersDAL.findAllStartWith(name);
        Users.forEach(function (user){user.password=null;user.token =null})
        return Users;
    }

    static async getUserById(id) {
        console.log("\tUserController@getUserById");
        const User = await usersDAL.findOne({id: id});
        return User;
        
    }

    static async getFriend(id) {
        console.log("\tUserController@getUserById");
        const User = await usersDAL.findFriend(id);
        return User;

    }


    static async getUserByToken(token) {
        console.log("\tUserController@getUserByToken");
        if (token === null)
            return null;
        const User = await usersDAL.findOne({token: token});
        return User;

    }

    static async createUser(body) {
        console.log("\tUserController@createUser");
        const User = await usersDAL.create(body)

    }
}

module.exports = UsersController;