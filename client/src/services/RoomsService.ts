import axios from 'axios';
const url =  "http://192.168.1.10:5000"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';

class RoomsService {
    static async getPrivateRoom(id1: number, id2: number) {
        try {
            const res = await axios.get( url + "/rooms/psn/" + id1 + "/" + id2);
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getStudyRoom(id: number, msg: boolean, members: boolean, owner: boolean){
        try {
            const res = await axios.get( url + 'rooms/study/' + id + '/Msg' + '/Mbs'+ '/OR');
            return res.data
        } catch (err) {
            return err
        }
    }

}

export default RoomsService;