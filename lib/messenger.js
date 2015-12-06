import socketio from 'socket.io'

import players, { addPlayer } from './players'
import Player from './player'

export default class Messenger {
  constructor(io) {
    this.io = io

    this.io.on('connection', (socket) => {
      let player = new Player(socket)

      console.log(`player connected`)

      socket.on('start', function (name) {
        console.log(`START EVENT SERVER`)
        player.start(name)

        console.log(`player ${player.name} started!`)
      })

      player.on('start', function () {
        socket.broadcast.emit('player started', player)
      })

      socket.on('move right', function () {
        player.moveRight()
      })

      socket.on('move left', function () {
        player.moveLeft()
      })

      socket.on('move stop', function () {
        player.moveStop()
      })

      socket.on('time sync', this.timeSync.bind(this))
      socket.emit('time sync', new Date().getTime())

      player.on('move right', function () {
        console.log(`move right on player ${player.name}`)

        socket.broadcast.emit('move right', player)
      })

      player.on('move left', function () {
        socket.broadcast.emit('move left', player)
      })

      player.on('move stop', function () {
        socket.broadcast.emit('move stop', player)
      })
    })
  }

  addPlayer(username) {
    console.log(`adding new player ${username}`)
    addPlayer(username)
  }

  timeSync(time) {
    let myTime = new Date().getTime()
    console.log(`it's time to sync ${time}. My time is ${myTime}!`)
  }
}
