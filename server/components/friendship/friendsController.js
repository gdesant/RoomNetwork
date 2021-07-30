const { Op } = require("sequelize");
const FriendsRequests = require("./friendsRequests")
const friendsRequestDAL = require("./friendsRequestsDAL");
const usersDAL = require('../users/usersDAL')

class FriendsController {
    static async getFriendsRequests() {
        console.log("\tUserController@getFriendRequests");
        const fr = await friendsRequestDAL.get();
        return fr;
    }

    static async getFriendRequestById(id) {
        console.log("\tUserController@getFriendRequestById");
        const fr = await friendsRequestDAL.findOne({id: id});
        return fr;
    }

    static async getFriendRequestsByReceiver(id) {
        console.log("\tUserController@getFriendRequestByReceiver");
        const fr = await friendsRequestDAL.findAll({receiverId: id});
        return fr;
    }

    static async getFriendRequestsBySender(id) {
        console.log("\tUserController@getFriendRequestBySender");
        const fr = await friendsRequestDAL.findAll({senderId: id});
        return fr;
    }

    static async updateFriendRequest(req){
        console.log("\tUserController@updateFriendRequest");
        const fr = await friendsRequestDAL.update( {status: req.body.status}, {
            id: req.body.id,
            [Op.or]: [{senderId: req.user.id}, {receiverId: req.user.id}]
        })
        return fr
    }

    static async approveFriendRequest(req){
        console.log("\tUserController@approveFriendRequest");
        let fr = await friendsRequestDAL.findOne( {
            id: req.body.id,
            receiverId: req.user.id
        })

        if(fr !== null)
        {
            let sender = await usersDAL.findOne({with:{id: fr.senderId}})
            let receiver = await usersDAL.findOne({with:{id: fr.receiverId}})
            if (sender !== null && receiver !== null){
                sender.addFriends(receiver)
                receiver.addFriends(sender)
                fr.status = 1
            }
        }
        return fr
    }

    static async cancelFriendRequest(req){
        console.log("\tUserController@cancelFriendRequest");
        let fr = await friendsRequestDAL.destroy( {
            id: req.body.id,
            senderId: req.user.id
        })
        return fr
    }

    static async refuseFriendRequest(req){
        console.log("\tUserController@refuseFriendRequest");
        let fr = await friendsRequestDAL.findOne( {
            id: req.body.id,
            receiverId: req.user.id
        })

        if(fr !== null)
            fr.status = 3
        return fr
    }

    static async createFriendRequest(req) {
        console.log("\tUserController@createFriendRequest");
        const fr = await friendsRequestDAL.create(req)
        return fr

    }
}

module.exports = FriendsController;