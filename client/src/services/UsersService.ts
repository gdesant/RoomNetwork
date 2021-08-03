import axios from 'axios';
const url =  "http://localhost:5000"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
axios.defaults.headers.common['Accept'] = 'application/json,text/plain, */*'
axios.defaults.headers.common['Content-Type'] = 'application/json'

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

    static async getUsersStartWith(name: string, id: number | string) {
        try {
            const res = await axios.get( url + "/users/all/sw/" + name + "/" + id);
            console.log(res);
            return res.data
        } catch (err) {
            return err
        }
    }



    static async getUserById(id: number) {
        try {
            const res = await axios.get(url + "/users/" + id)
            console.log(res.data)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getDashUserById(id: number) {
        try {
            const res = await axios.get(url + "/auth/users/dash/" + id)
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
            const res = await axios.post(url + "/auth/login" , {
                username: user.username,
                password: user.password
            })
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestBySenderId(id: string | number) {
        try {
            const res = await axios.get(url + "/auth/users/" + id + '/friendsent')
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestByReceiverId(id: string | number) {
        try {
            const res = await axios.get(url + "/auth/users/" + id + '/friendreceived')
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getPendingFriendsRequestByReceiverId(id: string | number) {
        try {
            const res = await axios.get(url + "/auth/users/" + id + '/friendreceived/0')
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getUserFriends(id: string | number) {
        try {
            const res = await axios.get(url + "/auth/users/" + id + '/friends')
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async logout(token: string) {
        try {
            const res = await axios.post(url + "/auth/logout" , {
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
            const res = await axios.post(url + "/auth/register" , {
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
            axios.defaults.headers.common = {'Authorization': `Bearer ` + token}
            const res = await axios.get(url + "/auth/verify")
            console.log('CheckToken :' + res)
            return res.data === true
        } catch (err) {
            console.log('TokenError : ' + err)
            return false
        }
    }


}

export default UsersService;