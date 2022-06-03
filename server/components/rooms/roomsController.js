const roomsDAL = require("./roomsDAL");
const roomrequestDAL = require("./roomRequests/roomRequestsDAL")
const {User, Message, RoomRequest, Addon} = require("../relations");
const { Op } = require("sequelize");


class RoomsController {
    static async getRooms() {
        console.log("\tRoomController@getRooms");
        const Rooms = await roomsDAL.get();
        return Rooms;
    }

    static async getStudyRoom(params, oid)
    {
        console.log("\tRoomController@getStudyRooms");

        let vid = 0
        if (typeof oid == 'number')
            vid = oid

        var includeClause= [
            {model: User, as: 'Owner', attributes: ['id', 'username']},
            {model: User, as: 'Members', attributes: ['id', 'username'], through: {attributes: ['id', 'status']}, required: false, where: {id: {[Op.not]: vid}}},
            {model: Message ,as: 'Messages', attributes: ['id', 'content', 'senderId', 'createdAt', 'senderUsername'], limit: 25, order: [['createdAt', 'DESC']]}
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

        let include= [
            {model: User, as: 'Members', attributes: ['id', 'username', 'pp_url', 'pp_settings'], through: {attributes: []}},
            {model: Message ,as: 'Messages', attributes: ['id', 'content', 'createdAt', 'senderId', 'senderUsername'], limit: 25, order: [['createdAt', 'DESC']]},
            {model: Addon, as: 'Addons'}
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

    static async createRoom(body) {
        console.log("\tRoomController@createRoom");
        if (body.type != 2)
        {
            const amount = await roomsDAL.count({
            [Op.and]: [{ownerId: body.ownerId}, {[Op.not]: {type: 2}}]
            })
            if (amount >= 10)
                return 491
        }
        const Room = await roomsDAL.create(body)
        let rr = await roomrequestDAL.create(Room.dataValues.id, body.ownerId)
        rr.setRoom(Room)

        let include= [
            {model: User, as: 'Owner', attributes: ['id', 'username']},
            {model: User, as: 'Members', attributes: ['id', 'username'], through: {attributes: []}},
            {model: Message ,as: 'Messages', attributes: ['id', 'content', 'createdAt', 'senderUsername'], limit: 25, order: [['createdAt', 'DESC']]},
            {model: Addon, as: 'Addons'}
        ]

        const roomFinal = await roomsDAL.findOne({id: Room.dataValues.id}, include)


        return roomFinal
    }
}

module.exports = RoomsController;