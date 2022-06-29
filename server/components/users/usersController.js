const usersDAL = require("./usersDAL");
const friendsRequestDAL = require("../friendship/friendsRequestsDAL");

class UsersController {
    static async getUsers() {
        console.log("\tUserController@getUsers");
        const Users = await usersDAL.get();
        Users.sort((e1, e2) => e1.id < e2.id);
        return Users;
    }



    static async getUsersStartWith(name, uId) {
        console.log("\tUserController@findStartWith");
        const jokes = await usersDAL.findAllStartWith(name, true, uId)

        return jokes;
    }

    static async getUserById(id, attributes) {
        console.log("\tUserController@getUserById");
        const User = await usersDAL.findOne({id: id}, attributes);
        return User;
        
    }

    static async getUserDashboardById(id) {
        console.log("\tUserController@getUserDashById");
        const User = await usersDAL.getUserDashboardById(id);
        return User;

    }

    static async getUserFriends(id) {
        console.log("\tUserController@getUserFriends");
        const User = await usersDAL.getUserFriends(id);
        return User;

    }

    static async getUserFriend(pid, sid, stat) {
        console.log("\tUserController@getUserFriend");
        let User = null;

        if (!isNaN(stat))
            User = await usersDAL.getUserFriend(pid, sid, stat);
        else
            User = await usersDAL.getUserFriend(pid, sid, 1);

        return User;

    }

    getUserFriend

    static async getUserMessages(id) {
        console.log("\tUserController@getUserById");
        const User = await usersDAL.getUserFriends(id);
        return User;

    }

    static async getUserByToken(token, attributes) {
        console.log("\tUserController@getUserByToken");
        if (token === null)
            return null;
        const User = await usersDAL.findOne({token: token}, attributes);
        if (User == null)
        {
            console.log("Can't find user with token : " + token)
            return null
        }
        return User;

    }

    static async createUser(body) {
        console.log("\tUserController@createUser");
        const User = await usersDAL.create(body)

    }
}

module.exports = UsersController;