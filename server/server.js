const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const faker = require('faker')
const app = express()
const { Sequelize } = require("@sequelize/core")

process.Sequelize = Sequelize
process.sequelize = new Sequelize(process.env.MYSQL_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
})

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

const {User, Room, Message, RoomRequest, FriendShipRequest} = require('./components/relations')

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

app.listen(port, '192.168.1.10', function () {
    console.log("Server started on port " + port);
});





/*
for(let i = -1; ++i < 30;)
{
 var msg = new Message();
 msg.content = "Salut message numero " + i;
 msg.roomId = 1;
 msg.senderId = i;
 msg.save()
}*/

