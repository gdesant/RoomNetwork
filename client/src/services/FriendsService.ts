import axios from 'axios';
const url =  "http://192.168.1.10:5000/friends"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
const authUrl =  "http://192.168.1.10:5000/auth"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
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
            const res = await axios.get( url + "/id/" + id);
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getUserFriendById(id: number,  sid:  number,  stat: number | null)
    {
        try{
            const res = await axios.get(authUrl +'/users/'+id+'/friend/'+ sid + '/' + (stat == null ? '1' : stat.toString()))
            return res.data
        }catch (e){
            return e
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
            return false
        }
    }

    static async delete(id: number){
        try {
            const res = await axios.post(url + "/delete" , {
                id: id,
            })
            return res.data
        } catch (err) {
            return err
        }
    }

    static async create(receiverId: number, gban: boolean | null) {
        try {
            const res = await axios.post(url + "/create" , {
                receiverId: receiverId,
                gban:  gban,
            })
            return res.data
        } catch (err) {
            return err
        }
    }
}

export default FriendsService;