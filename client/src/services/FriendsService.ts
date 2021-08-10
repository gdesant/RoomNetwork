import axios from 'axios';
const url =  "http://localhost:5000/friends"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
axios.defaults.headers.post['Accept'] = 'application/json,text/plain, */*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

class FriendsService {
    static async getFriendsRequests() {
        try {
            const res = await axios.get( url + "/all");
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestById(id: string | number) {
        try {
            const res = await axios.get( url + "/friends/id/" + id);
            return res.data
        } catch (err) {
            return err
        }
    }


    static async update(id: number, status: number) {
        try {
            const res = await axios.post(url + "/update" , {
                id: id,
                status: status
            })
            return res.data
        } catch (err) {
            return err
        }
    }

    static async create(receiverId: number) {
        try {
            const res = await axios.post(url + "/create" , {
                receiverId: receiverId,
            })
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default FriendsService;