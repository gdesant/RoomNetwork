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

    static async getUserFriendRequestsSent(id) {
        console.log("\tUserController@getUserFriendRequestsSent");
        const fr = await friendsRequestDAL.getUserFriendRequestsSent(id);
        return fr;
    }

    static async getUserAreLinked(id1, id2){
        const fr = await friendsRequestDAL.getUserHaveLink(id1, id2);
        return fr;
    }

    static async getUserFriendRequestsReceived(id) {
        console.log("\tUserController@getUserFriendRequestsReiceived");
        const fr = await friendsRequestDAL.getUserFriendRequestsReceived(id, {where: {status: {[Op.not]: 1}}});
        return fr;
    }

    static async getUserFriendRequestsReceivedbyStatus(id, status) {
        console.log("\tUserController@getUserFriendRequestsReiceived");
        const fr = await friendsRequestDAL.getUserFriendRequestsReceived(id, {where: {status: status}, attributes: ['id', 'updatedAt']});
        return fr;
    }

    static async updateFriendRequest(req){
        console.log("\tUserController@updateFriendRequest : ")
        console.log(req.user)
        const fr = await friendsRequestDAL.update( {status: req.body.status}, {
            id: req.body.id,
            [Op.or]: [{senderId: req.userData.id}, {receiverId: req.userData.id}]
        })
        return fr
    }

    static async approveFriendRequest(req){
        console.log("\tUserController@approveFriendRequest");
        let fr = await friendsRequestDAL.findOne( {
            id: req.body.id,
            receiverId: req.userData.id
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

    static async cancelFriendRequest(data){
        console.log("\tUserController@cancelFriendRequest");
        let fr = await friendsRequestDAL.destroy(data)
        return fr
    }

    static async refuseFriendRequest(req){
        console.log("\tUserController@refuseFriendRequest");
        let fr = await friendsRequestDAL.findOne( {
            id: req.body.id,
            receiverId: req.userData.id
        })

        if(fr !== null)
            fr.status = 3
        return fr
    }

    static async createFriendRequest(req) {
        console.log("\tUserController@createFriendRequest");
        const sender = req.userData
        const receiver = await usersDAL.findOne({id : req.body.receiverId}, ["id", "username", "email"])
        const gban = (req.body.gban == true ? 4 : 0)
        console.log("Create a " + (gban == 4  ?  "ghostban" : "friendrequest")  + " from " + sender.id + " to " + receiver.id + " !")
        const fr = await friendsRequestDAL.create(sender, receiver, gban)
        return fr

    }
}

module.exports = FriendsController;