import axios from 'axios';
const url =  "http://192.168.1.10:5000"//process.env.API_URL ||'https://hexwar-dev.herokuapp.com/';
axios.defaults.headers.common['Accept'] = 'application/json,text/plain, */*'
axios.defaults.headers.common['Content-Type'] = 'application/json'

class UsersService {
    static async getUsers() {
        try {
            const res = await axios.get( url + "/users/all");
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getUserName(id: number) {
        try {
            const res = await axios.get( url + "/users/un/:id");
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getUsersStartWith(name: string, id: number) {
        try {
            const res = await axios.get( url + "/users/all/sw/" + name + '/' + id);
            console.log('getUserStartWith  :')
            console.log(res)
            return res.data
        } catch (err) {
            return err
        }
    }



    static async getUserById(id: number) {
        try {
            const res = await axios.get(url + "/users/" + id)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getPrivateUserById(id: number | string) {
        try {
            const res = await axios.get(url + "/auth/users/" + id)
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getDashUserById(id: number) {
        try {
            const res = await axios.get(url + "/auth/users/dash/" + id)
            return res.data
        } catch (err) {
            return err
        }
    }


    static async getUserByToken(token: string) {
        try {
            const res = await axios.get(url + "/users/tk/" + token)
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
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestBySenderId(id: string | number) {
        try {
            const res = await axios.get(url + "/auth/users/" + id + '/friendsent')
            return res.data
        } catch (err) {
            return err
        }
    }

    static async getFriendsRequestByReceiverId(id: string | number) {
        try {
            const res = await axios.get(url + "/auth/users/" + id + '/friendreceived')
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

    static async update(user: {username: string, email: string, firstName: string | null, lastName: string | null, publicAccount: boolean, publicEmail: boolean, token: string}, id: number) {
        try {
            const res = await axios.post(url + "/auth/update/" + id , {
                username: user.username,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                publicAccount: user.publicAccount,
                publicEmail: user.publicEmail,
                token: user.token,
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
            console.log('CheckToken :')
            console.log(res)
            return res.data === true
        } catch (err) {
            console.log('TokenError : ' + err)
            return false
        }
    }


}

export default UsersService;