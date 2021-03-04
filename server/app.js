const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()


const m = (name, text, id) => ({ name, text, id })

io.on('connection', socket => {

    socket.on('userJoined', (data, cb) => {
        if (!data.name) {
            return cb('Error')
        }
        const currentRoom = socket.id.slice(0, 2);
        // currentRoom = 38

        socket.join(38)
        socket.emit('addRoom', 38)

        users.remove(socket.id)
        users.add({
            id: socket.id,
            name: data.name,
            room: 38
        })

        cb({ userId: socket.id, userRoom: 38 })
            // передаем список пользователей
        io.to(38).emit('updateUsers', users.getByRoom(38))

        socket.emit('newMessage', m('admin', `Hi ${data.name}!`))

        socket.broadcast.to(38)
            .emit('newMessage', m('admin', `User ${data.name} connected.`))
    })

    socket.on('createMessage', (data, cb) => {
        if (!data.text) {
            return cb('No message')
        }

        const currentUser = users.get(data.id)
        if (currentUser) {
            io.to(currentUser.room).emit('newMessage', m(currentUser.name, data.text, data.id))
        }
        cb()
    })

    socket.on('userLeft', (id, cb) => {
        const user = users.remove(id)
        if (user) {
            io.to(user.room).emit('newMessage', m('admin', `User ${user.name} disconnected.`));
        }
        cb()
    })

    socket.on('disconnect', () => {
        const user = users.remove(socket.id)
        if (user) {
            // обновляем список пользователей
            io.to(user.room).emit('updateUsers', users.getByRoom(38));

            io.to(user.room).emit('newMessage', m('admin', `User ${user.name} disconnected.`));
        }
    })
})

module.exports = {
    app,
    server
}