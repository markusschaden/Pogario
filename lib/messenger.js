import socketio from 'socket.io'

export default class Messenger {
  constructor(io) {
    this.io = io

    this.io.on('connection', (socket) => {
      socket.on('add player', this.addPlayer.bind(this))
      socket.on('time sync', this.timeSync.bind(this))

      socket.emit('time sync', new Date().getTime())
    })
  }

  addPlayer() {
    console.log('add player')
  }

  timeSync(time) {
    let myTime = new Date().getTime()
    console.log(`it's time to sync ${time}. My time is ${myTime}!`)
  }  
}
