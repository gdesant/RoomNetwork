let io;

module.exports = {
    init: (server) => {
        app = require('express')
        server = require('http').Server(app);
        io = require('socket.io')(server);
        server.listen('3000')
        return io;
    },
    get: () => {
        if (!io) {
            throw new Error("socket is not initialized");
        }
        return io;
    }
};