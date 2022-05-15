const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const faker = require('faker')
const { Sequelize } = require("@sequelize/core")


const app = express()

process.Sequelize = Sequelize
process.sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false,
})

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

var allClients = []
const io = require('./components/socketio').init();


io.on('connection', function(socket) {
    console.log(socket.id + ' just connected !');
    allClients.push(socket);

    socket.on('join_room', function(data){
        socket.join('room_' + data.id.toString())
        console.log(socket.id + ' has joined the room ' + data.id.toString() + ' !')
    })

    socket.on('exit_room', function(data){
        socket.leave('room_' + data.id.toString())
        console.log(socket.id + ' has leave the room ' + data.id.toString() + ' !')
    })

    socket.on('disconnectDash', function() {
        console.log(socket.id + ' got disconnect!');

        var i = allClients.indexOf(socket);
        allClients.splice(i, 1);
    });

});





const {User, Room, Message, RoomRequest, FriendShipRequest, Addon} = require('./components/relations')

const users = require("./components/users/usersAPI")
const rooms = require("./components/rooms/roomsAPI")
const roomrequests = require('./components/rooms/roomRequests/roomRequestsAPI')
const friends = require("./components/friendship/friendsAPI")
const auth = require("./components/auth/authAPI")
const message = require("./components/message/messageAPI")

app.use(bodyParser.json());
app.use(cors());

process.sequelize
.authenticate()
.then(() => {
    console.log('\x1b[033m[Server]\x1b[0m Connected to database!');
})
.catch(err => {
    console.error('Unable to connect to the database:', err);
});


app.use('/rooms/', rooms)
app.use('/roomrequests/', roomrequests)
app.use('/friends/', friends)
app.use('/users/', users)
app.use('/auth/', auth)
app.use('/messages/', message)

const port = process.env.PORT || 5000;

app.listen(port, '192.168.1.15', function () {
    console.log("Server SQL started on port " + port);
});

module.exports.io = io





