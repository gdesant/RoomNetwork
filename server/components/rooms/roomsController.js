const roomsDAL = require("./roomsDAL");
const {User, Message, RoomRequest} = require("../relations");


class RoomsController {
    static async getRooms() {
        console.log("\tRoomController@getRooms");
        const Rooms = await roomsDAL.get();
        return Rooms;
    }

    static async getStudyRoom(params)
    {
        console.log("\tRoomController@getStudyRooms");

        var includeClause= [
            {model: User, as: 'Owner', attributes: ['id', 'username']}, {model: User, as: 'Members', attributes: ['id', 'username'], through: {attributes: []}}, {model: Message ,as: 'Messages', attributes: ['id', 'content', 'createdAt', 'senderUsername'], limit: 25, order: [['createdAt', 'DESC']]}
        ]

        const Room = await roomsDAL.findOne({id: params.id}, includeClause);
        if (!(params.p1 == 'Msg'|| params.p2 == 'Msg' || params.p3 == 'Msg'))
            await delete Room.dataValues.Messages

        if (!(params.p1 == 'Mbs'|| params.p2 == 'Mbs' || params.p3 == 'Mbs'))
            await delete Room.dataValues.Members

        if (!(params.p1 == 'OR'|| params.p2 == 'OR' || params.p3 == 'OR'))
            await delete Room.dataValues.Owner

        await delete Room.dataValues.ownerId


        return Room;
    }

    static async getPersonalRoom(id1, id2){
        console.log("\tRoomController@findPersonalRoom");
        const user1 = await User.findOne({
            where: {
                id: id1
            }
        })

        const user2 = await User.findOne({
            where: {
                id: id2
            }
        })

        if (user1 == null)
            return ({error: "There is no user with the id " + id1})

        if (user2 == null)
            return ({error: "There is no user with the id " + id2})

        var include= [
            {model: User, as: 'Owner', attributes: ['id', 'username']}, {model: User, as: 'Members', attributes: ['id', 'username'], through: {attributes: []}}, {model: Message ,as: 'Messages', attributes: ['id', 'content', 'createdAt', 'senderUsername'], limit: 25, order: [['createdAt', 'DESC']]}
        ]

        let attribute = ['id']

        const Room = await roomsDAL.findPersonalRoom(id1, id2, attribute, include);


        return Room;
    }

    static async getRoomById(id) {
        console.log("\tRoomController@getRoomById");
        const Room = await roomsDAL.findOne({id: id});
        return Room;
        
    }

    static async createRoom(body, owner) {
        console.log("\tRoomController@createRoom");
        const Room = await roomsDAL.create(body, owner.id)
        return Room
    }
}

module.exports = RoomsController;