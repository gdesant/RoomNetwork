const roomsDAL = require("./roomsDAL");

class RoomsController {
    static async getRooms() {
        console.log("\tUserController@getUsers");
        const Rooms = await roomsDAL.get();
        return Rooms;
    }

    static async getRoomById(id) {
        console.log("\tUserController@getUserById");
        const Room = await roomsDAL.findOne({id: id});
        return Room;
        
    }

    static async createRoom(body, owner) {
        console.log("\tUserController@createUser");
        const Room = await roomsDAL.create(body)
        Room.Owner = owner
        return

    }
}

module.exports = RoomsController;