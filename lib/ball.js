import Victor from 'victor'
import EventEmitter from 'events'

var io;

export default class Ball extends EventEmitter {
    constructor(socketio) {
        super()

        io = socketio;
        this.radius = 15;
        this.x = 50;
        this.y = 50;
        this.direction = new Victor(0.1, 0.1);
    }

    update(delta) {
        this.x += this.direction.x * delta;
        this.y += this.direction.y * delta;

        io.emit('ball changed', this);
    }
}