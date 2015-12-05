import socketio from 'socket.io'

export default class Messenger {
  constructor(io) {
    this.io = io

    this.io.on('connection', function (socket) {
      socket.on('add player', (...args) => this.addPlayer(...args))
    })
  }

  addPlayer() {
    console.log('add player')
  }
}
