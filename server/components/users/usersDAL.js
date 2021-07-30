const {User, FriendShipRequest} = require('../relations')
const { Op } = require("sequelize");

class usersDAL {
    static async get() {
        console.log("\t\tUsersDAL@get");
        return await User.findAll({});
    }

    static async findOne(whereClause) {
        console.log("\t\tUsersDAL@findOne");
        return await User.findOne({
            where: whereClause
        });
    }

    static async findAllStartWith(name) {
        console.log("\t\tUsersDAL@findAllStartWith");
        return await User.findAll({
            where: {
                username:{
                    [Op.startsWith]: name,
                },
            },
        })
    }

    static async findFriend(id) {
        console.log("\t\tUsersDAL@findFriend");
        return await User.findAll({
            include: [{
                model:User,
                as: 'friend',
            }],
        })
    }

    static async update(updateClause, whereClause) {
        console.log("\t\tUsersDAL@update");
        return await User.update(updateClause, {
            where: whereClause
        });
    }

    static async create(body) {
        console.log("\t\tUsersDAL@create");
        return await User.create({
            username: body.username,
            email: body.email,
            password: body.password
        })
    }
}

module.exports = usersDAL
