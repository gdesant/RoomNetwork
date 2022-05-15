import axios from 'axios';
const url =  "http://192.168.1.15:5000"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';

class RoomsService {
    static async getPrivateRoom(id1: number, id2: number) {
        try {
            const res = await axios.get( url + "/rooms/psn/" + id1 + "/" + id2);
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getStudyRoom(id: number, msg: boolean, members: boolean, owner: boolean, plid: number){
        try {
            const res = await axios.post( url + '/rooms/study/' + id + '/Msg' + '/Mbs'+ '/OR', {id: plid});
            return res.data
        } catch (err) {
            return err
        }
    }

    static async createNewRoom(ownerId: number, name: string, type: number) {
        try {
            const res = await axios.post( url + '/rooms/create/', {
                roomName: name,
                ownerId: ownerId,
                type: type,
            });
            console.log("Create Room Return :")
            console.log(res)
            return res.data
        } catch (err) {
            console.log(err.response)
            return err
        }
    }

}

export default RoomsService;