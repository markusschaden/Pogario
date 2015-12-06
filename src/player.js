export default class Player {

  constructor() {
    this.x = 300;
    this.y = 300;

    this.size = 60;
    this.radius = 70;
    this.padLength = 60;
    this.currentPadPos = 0;
    this.padMovement = 0;
    this.maxSpeed = 10;
    this.directionChanged = false;
  }

  update(delta) {
    this.currentPadPos = (this.currentPadPos += this.padMovement) % 360;
    this.currentPadPos = (this.currentPadPos < 0) ? 360 + this.currentPadPos : this.currentPadPos;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 5;
    context.strokeStyle = '#7FFF00';
    context.stroke();

    context.beginPath();
    context.arc(this.x,this.y,this.radius,this.getRadians(this.currentPadPos-this.padLength/2),this.getRadians(this.currentPadPos+this.padLength/2));
    context.lineWidth = 10;
    context.strokeStyle = '#FF0066';
    context.stroke();
  }

  getRadians(dgrs) {
    var degrees = ( Math.PI/180 ) * dgrs;
    return degrees;
  }


  moveLeft(){
    if(!this.directionChanged) {
      this.directionChanged = true;
      this.padMovement = 1;
    }
    if(this.padMovement < this.maxSpeed) {
      this.padMovement += 0.1;
    }
  }

  moveRight() {
    if(!this.directionChanged) {
      this.directionChanged = true;
      this.padMovement = -1;
    }
    if(this.padMovement > -this.maxSpeed) {
      this.padMovement -= 0.1;
    }
  }

  moveStop() {
    this.directionChanged = false;
    this.padMovement = 0;
  }

}
