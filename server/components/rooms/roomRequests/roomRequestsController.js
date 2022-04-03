const roomRequestsDAL = require("./roomRequestsDAL");

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

    static async createRoom(body, owner) {
        console.log("\tRoomRequestsController@createRoom");
        const RoomRequest= await roomRequestsDAL.create(body, owner.id)
        return
    }
}

module.exports = RoomRequestsController;