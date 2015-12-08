import socketio from 'socket.io';
import Manager from './manager';

export default class Game {
    constructor(io) {
        this.io = io;

        this.manager = new Manager(io);

        this.thisTime = new Date().getTime();
        this.delta = 0;
        this.lastTime = this.thisTime;
        this.interval = 0;
        this.targetInterval = 15;

        this.loop();
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