import axios from 'axios';
const url =  "http://192.168.1.10:5000"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';

class MessagesService {
    static async sendRoomMessage(userId: number, roomId: number, content: string) {
        console.log("       SendMessage - MessagesService")
        try {
            const res = await axios.post(url + "/auth/msg/new" , {
                userId: userId,
                roomId: roomId,
                content: content
            })
            return res.data
        } catch (err) {
            return err
        }
    }

    static async sendNewRoomMessage(id1: number, id2: number, content: string) {
        console.log("        SendNewRoomMessage - MessagesService")
        try {
            const res = await axios.post(url + "/auth/msg/new2" , {
                ownerId: id1,
                userId: id2,
                content: content
            })
            return res.data
        } catch (err) {
            return err
        }
    }

}

export default MessagesService;