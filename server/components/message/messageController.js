const messageDAL = require("./messageDAL");
const roomDAL = require("../rooms/roomsDAL");
const roomrequestDal = require("../rooms/roomRequests/roomRequestsDAL");
const roomsController = require("../rooms/roomsController");
const usersController = require("../users/usersController");

class MessageController {
    static async getMessages() {
        console.log("\tMessageController@getMessages");
        const Message = await messageDAL.get();
        return Message;
    }

    static async findMessages(clause) {
        console.log("\tMessageController@getMessages");
        const Message = await messageDAL.findAll(clause);
        return Message;
    }

    static async getMessageById(id) {
        console.log("\tMessageController@getMessageById");
        const Message = await messageDAL.findOne({id: id});
        return Message;

    }

    static async getMessagesByRoomId(id) {
        console.log("\tMessageController@getMessageByRoomId :" + id);
        const Message = await messageDAL.findAll({'$Contact.roomId$': id});
        return Message;

    }

    static async getMessagesBySenderId(id) {
        console.log("\tMessageController@getMessageBySenderId :" + id);
        const Message = await messageDAL.findAll({'$Contact.senderId$': id});
        return Message;

    }

    static async createRoomAndMessage(body) {
        console.log("\tMessageController@createRoomAndMessage");

        if(body.content.length == 0)
            return 400
        else if (body.content.length > 254)
            return 409

        const room = await roomDAL.create({type: 2})

        const id = room.dataValues.id
        const user = await usersController.getUserById(body.userId, ['username'])

        let bd = {
            content: body.content,
            roomId: id,
            senderId: body.senderId,
            username: user.dataValues.username,
        }

        const message = await messageDAL.create(bd)



        const roomreq = await roomrequestDal.create(id, body.senderId)
        await roomreq.addMessages(message)

        await roomrequestDal.create(id, body.userId)

        var final = await roomsController.getStudyRoom({id: id, p1: 'Msg', p2: 'Mbs'})

        return final;

    }

    static async createMessage(body) {
        console.log("\tMessageController@createMessage");

        if(body.content.length == 0)
            return 400
        else if (body.content.length > 254)
                return 409

        const roomreq = await roomrequestDal.findOne({senderId: body.senderId, roomId: body.roomId})
        const user = await usersController.getUserById(body.senderId, ['username'])
        body.username = user.dataValues.username
        const message = await messageDAL.create(body)

        await roomreq.addMessages(message)

        return message;

    }
}

module.exports = MessageController;