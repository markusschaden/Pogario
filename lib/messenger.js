import socketio from 'socket.io'

import players, {
    addPlayer
}
from './players'
import Player from './player'
import Ball from './ball'
import Manager from '../src/manager';

export default class Messenger {
    constructor(io) {
        this.io = io
        
        this.manager = new Manager();

        this.ball = new Ball(io);
        this.manager.balls.push(this.ball);

        this.thisTime = new Date().getTime();
        this.delta = 0;
        this.lastTime = this.thisTime;
        this.interval = 0;
        this.targetInterval = 15;

        this.loop();

        this.io.on('connection', (socket) => {
            let player = new Player(socket)
            this.manager.players.push(player);

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

    update(delta) {
        this.manager.update(delta);
    }

    loop() {
        this.thisTime = new Date().getTime();
        this.delta = this.thisTime - this.lastTime;
        this.lastTime = this.thisTime;

        this.update(this.delta);
        this.interval = this.targetInterval - (new Date().getTime() - this.thisTime);
        this.interval = this.interval < 1 ? 1 : this.interval;
        setTimeout(() => {
            this.loop()
        }, this.interval);
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