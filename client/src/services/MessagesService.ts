import axios from 'axios';
const authUrl =  "http://192.168.1.10:5000/auth"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
const msgUrl =  "http://192.168.1.10:5000/messages"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';

class MessagesService {
    static async sendRoomMessage(userId: number, roomId: number, content: string) {
        console.log("       SendMessage - MessagesService")
        try {
            const res = await axios.post(authUrl + "/msg/new" , {
                senderId: userId,
                roomId: roomId,
                content: content
            })
            return res.data
        } catch (err) {
            return false
        }
    }

    static async sendNewRoomMessage(id1: number, id2: number, content: string) {
        console.log("        SendNewRoomMessage - MessagesService")
        try {
            const res = await axios.post(authUrl + "/msg/neR" , {
                senderId: id1,
                userId: id2,
                content: content
            })
            return res.data
        } catch (err) {
            return false
        }
    }

    static async getMessageById(messageId: number) {
        try {
            const res = await axios.get( msgUrl + "/id/" + messageId.toString());
            return res.data
        } catch (err) {
            return false
        }
    }

}

export default MessagesService;