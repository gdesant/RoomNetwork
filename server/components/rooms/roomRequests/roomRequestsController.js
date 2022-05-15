const roomRequestsDAL = require("./roomRequestsDAL");
const roomsDAL = require('../roomsDAL')

class RoomRequestsController {
    static async getRooms() {
        console.log("\tRoomRequestsController@getRooms");
        const RoomRequests = await roomRequestsDAL.get();
        return RoomRequests;
    }

    static async getRoomById(id) {
        console.log("\tRoomRequestsController@getRoomById");
        const RoomRequest = await roomRequestsDAL.findOne({id: id});
        return RoomRequest;
        
    }

    static async changeMemberStatus(body){
        console.log("\tRoomRequestsController@changeMemberStatus");
        if (typeof body.playerId != 'number' || typeof body.roomId != 'number' || typeof body.memberId != 'number' || typeof body.status != 'number')
            return 400

        const Room = await roomsDAL.findOne({id: body.roomId})
        const Owner = await Room.getOwner()

        if (Owner.id != body.playerId)
            return 401


        const RoomRequest = await roomRequestsDAL.update({
            status: body.status,
        },{
            senderId: body.memberId,
            roomId: body.roomId,
        });
        return RoomRequest;
    }

    static async createRoom(body, owner) {
        console.log("\tRoomRequestsController@createRoom");
        const RoomRequest= await roomRequestsDAL.create(body, owner.id)
        return
    }
}

module.exports = RoomRequestsController;