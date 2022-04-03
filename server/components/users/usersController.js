const usersDAL = require("./usersDAL");
const friendsRequestDAL = require("../friendship/friendsRequestsDAL");

class UsersController {
    static async getUsers() {
        console.log("\tUserController@getUsers");
        const Users = await usersDAL.get();
        Users.sort((e1, e2) => e1.id < e2.id);
        return Users;
    }



    static async getUsersStartWith(name, userId) {
        Object.size = function(obj) {
            var size = 0,
                key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        };

        console.log("\tUserController@findStartWith");

        const jokes = await usersDAL.findAllStartWith(name, true, userId)
        const Users = []

        for(let i = -1; ++i < Object.size(jokes);){
            let stat = await friendsRequestDAL.getUserHaveLink(userId, jokes[i].id)
            console.log(stat)
            if (stat < 0 && jokes[i].id !== userId)
                Users[Users.length] = jokes[i];
        }

        return Users;
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
        console.log("\tUserController@getUserById");
        const User = await usersDAL.getUserFriends(id);
        return User;

    }

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