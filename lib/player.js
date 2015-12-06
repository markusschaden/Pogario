import EventEmitter from 'events'

export default class Player extends EventEmitter {
  constructor(player) {
    super()

    this.name = 'unnamed'

    this.x = 300;
    this.y = 300;

    this.size = 60;
    this.radius = 70;
    this.padLength = 60;
    this.currentPadPos = 30;
    this.padMovement = 0;
    this.maxSpeed = 4;
    this.directionChanged = false;
  }

  start(name) {
    this.name = name

    console.log(`started as ${name}`)

    this.emit('start')
  }

  moveLeft(){
    this.padMovement = 2;

    this.emit('move left')
  }

  moveRight() {
    this.padMovement = -2;

    this.emit('move right')
  }

  moveStop() {
    this.padMovement = 0;

    this.emit('move stop')
  }
}
