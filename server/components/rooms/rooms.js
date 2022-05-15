class RoomType {
    static Public = new RoomType('public', 0)
    static Private = new RoomType('private', 1)
    static Personal = new RoomType('personal', 2)

    constructor(name, int) {
        this.name = name
        this.value = int
    }
}

const Room = process.sequelize.define('room', {
    // attributes
    id: {
        type: process.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    type: {
        type: process.Sequelize.INTEGER,
        allowNull: true,
    },
    name: {
        type: process.Sequelize.STRING,
        allowNull: true,
    },
    ownerId: {
        type: process.Sequelize.INTEGER,
        allowNull: true,
    }
}, {
    timestamps: true
});



module.exports = Room
return Room