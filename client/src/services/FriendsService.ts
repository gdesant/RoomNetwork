import axios from 'axios';
const url =  "http://localhost:5000/friends"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
axios.defaults.headers.post['Accept'] = 'application/json,text/plain, */*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

class FriendsService {
    static async getFriendsRequests() {
        try {
            const res = await axios.get( url + "/all");
            console.log(res);
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestById(id) {
        try {
            const res = await axios.get( url + "/id/" + id);
            console.log(res);
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestBySenderId(id) {
        try {
            const res = await axios.get(url + "/sender/" + id)
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestByReceiverId(id) {
        try {
            const res = await axios.get(url + "/receiver/" + id)
            console.log(res)
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
            console.log(res)
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