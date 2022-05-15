import axios from 'axios';
const url =  "http://192.168.1.15:5000/"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';

class RoomsEditingService {
    static async changeMemberStatus(playerId: number, roomId: number, memberId: number, newStatus: number){
        try {
            const res = await axios.post( url + 'roomrequests/changeStatus/', {
                playerId: playerId,
                roomId: roomId,
                memberId: memberId,
                status: newStatus,
            });
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default RoomsEditingService;