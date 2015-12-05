import http from 'http'
import colors from 'colors'
import socketio from 'socket.io'
import Messenger from './lib/messenger'

let server = http.createServer()
let io = socketio(server)

let host = process.env.HOST || '0.0.0.0'
let port = process.env.PORT || 3000

new Messenger(io)

server.listen(port, host, function () {
  console.log(`Server ${'running'.black.bgGreen} on ${`http://${host}:${port}`.cyan}`)
})
