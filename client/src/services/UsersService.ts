import axios from 'axios';
const url =  "http://localhost:5000"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
axios.defaults.headers.post['Accept'] = 'application/json,text/plain, */*'
axios.defaults.headers.post['Content-Type'] = 'application/json'

class UsersService {
    static async getUsers() {
        try {
            const res = await axios.get( url + "/users/all");
            console.log(res);
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getUsersStartWith(name: string) {
        try {
            const res = await axios.get( url + "/users/all/sw/" + name);
            console.log(res);
            return res.data
        } catch (err) {
            return err
        }
    }



    static async getUserById(id: number) {
        try {
            const res = await axios.get(url + "/users/id/" + id)
            console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getUserByToken(token: string) {
        try {
            const res = await axios.get(url + "/users/tk/" + token)
            console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async login(user: {username: string, password: string}) {
        try {
            const res = await axios.post(url + "/login" , {
                username: user.username,
                password: user.password
            })
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async logout(token: string) {
        try {
            const res = await axios.post(url + "/logout" , {
                token: token
            })
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async register(user: {username: string, email: string, password: string}) {
        try {
            const res = await axios.post(url + "/register" , {
                username: user.username,
                email: user.email,
                password: user.password
            })
            return res.data
        } catch (err) {
            return err
        }
    }

    static async checkToken(token: string) {
        try {
            const res = await axios.post(url + "/verify" , {
                token: token
            })
            return res.data
        } catch (err) {
            return false
        }
    }


}

export default UsersService;