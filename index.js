import http from 'http'
import express from 'express'
import colors from 'colors'
import socketio from 'socket.io'
import serveStatic from 'serve-static'

import Game from './lib/game'

let app = express()
let server = http.createServer(app)
let io = socketio.listen(server)

app.use(serveStatic('dist'))

let host = process.env.HOST || '0.0.0.0'
let port = process.env.PORT || 3000

new Game(io)

server.listen(port, host, function () {
  console.log(`Server ${'running'.black.bgGreen} on ${`http://${host}:${port}`.cyan}`)
})
