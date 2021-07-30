const express = require('express')
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const { Sequelize } = require("sequelize")

process.Sequelize = Sequelize
process.sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    logging: false
})

const {User, Room, FriendShipRequest} = require('./components/relations')

const users = require("./components/users/usersAPI")
const rooms = require("./components/rooms/roomsAPI")
const friends = require("./components/friendship/friendsAPI")
const auth = require("./components/auth/authAPI")

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



app.use('/rooms', rooms)
app.use('/friends', friends)
app.use('/users', users)
app.use('/', auth)

const port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log("Server started on port " + port);
});
