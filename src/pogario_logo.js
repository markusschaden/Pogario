export default class Pogario_Loadbar {

  constructor() {
    this.x = 100;
    this.y = 700;

    this.size = 60;
    this.radius = 75;
    this.padLength = 60;
    this.currentPadPos = 30;
    this.currChar = this.update_p;
  }

  update(delta) {
    //currChar(delta);
    this.currentPadPos = (this.currentPadPos += 1) % 360;
    //this.currentPadPos = (this.currentPadPos += 1) % 360;
  }

  update_p(delta) {
    this.currentPadPos = (this.currentPadPos += 1) % 360;
    //setTimeout(change_p2o(), 5000);
  }

  update_o(delta) {
    this.currentPadPos = (this.currentPadPos += 1) % 360;
  }

  change_p2o(){
    this.currChar = update_o;
  }

  draw_p(context, position, startTime, waitingTime) {
    context.beginPath();
    context.arc(this.x+position*3*this.radius, this.y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = '#7FFF00';
    context.stroke();

    context.beginPath();
    context.moveTo(this.x+position*3*this.radius-this.radius, this.y);
    context.lineTo(this.x+position*3*this.radius-this.radius, this.y+2*this.radius);
    context.lineWidth = 3;

    // set line color
    context.strokeStyle = '#7FFF00';
    context.stroke();

    context.beginPath();
    context.arc(this.x+position*3*this.radius,this.y,this.radius,this.getRadians(this.currentPadPos+2*this.radius),this.getRadians(this.currentPadPos+this.padLength+2*this.radius));
    context.lineWidth = 6;
    context.strokeStyle = '#FF0066';
    context.stroke();
  }

  draw_o(context, position, startTime, waitingTime) {
    context.beginPath();
    context.arc(this.x+position*3*this.radius, this.y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = '#7FFFFF';
    context.stroke();

    context.beginPath();
    context.arc(this.x+position*3*this.radius,this.y,this.radius,this.getRadians(this.currentPadPos),this.getRadians(this.currentPadPos+this.padLength));
    context.lineWidth = 6;
    context.strokeStyle = '#FF0066';
    context.stroke();
  }

  draw_g(context, position, startTime, waitingTime) {
    context.beginPath();
    context.arc(this.x+position*3*this.radius, this.y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = '#FF0000';
    context.stroke();

    context.beginPath();
    context.arc(this.x+position*3*this.radius, this.y+this.radius, this.radius, 0, Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = '#FF0000';
    context.stroke();

    context.beginPath();
    context.moveTo(this.x+position*3*this.radius+this.radius, this.y);
    context.lineTo(this.x+position*3*this.radius+this.radius, this.y+this.radius);
    context.lineWidth = 3;

    // set line color
    context.strokeStyle = '#FF0000';
    context.stroke();

    context.beginPath();
    context.arc(this.x+position*3*this.radius,this.y,this.radius,this.getRadians(this.currentPadPos-2*this.radius),this.getRadians(this.currentPadPos+this.padLength-2*this.radius));
    context.lineWidth = 6;
    context.strokeStyle = '#FF0066';
    context.stroke();
  }

  draw_a(context, position, startTime, waitingTime) {
    context.beginPath();
    context.arc(this.x+position*3*this.radius, this.y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = '#7FFF00';
    context.stroke();

    context.beginPath();
    context.moveTo(this.x+position*3*this.radius+this.radius, this.y);
    context.lineTo(this.x+position*3*this.radius+this.radius, this.y+this.radius);
    context.lineWidth = 3;

    // set line color
    context.strokeStyle = '#7FFF00';
    context.stroke();

    context.beginPath();
    context.arc(this.x+position*3*this.radius,this.y,this.radius,this.getRadians(this.currentPadPos),this.getRadians(this.currentPadPos+this.padLength));
    context.lineWidth = 6;
    context.strokeStyle = '#FF0066';
    context.stroke();
  }


  draw_r(context, position, startTime, waitingTime) {
    /*
    context.beginPath();
    context.arc(this.x+position*3*this.radius, this.y, this.radius, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.strokeStyle = '#FFFF00';
    context.stroke();
*/
    context.beginPath();
    context.moveTo(this.x+position*3*this.radius-this.radius, this.y);
    context.lineTo(this.x+position*3*this.radius-this.radius, this.y+this.radius);
    context.lineWidth = 8;

    // set line color
    context.strokeStyle = '#FFFF00';
    context.stroke();

    context.beginPath();
    context.arc(this.x+position*3*this.radius, this.y, this.radius, Math.PI, 1.5 * Math.PI, false);
    context.lineWidth = 8;
    context.strokeStyle = '#FFFF00';
    context.stroke();

    context.beginPath();
    context.arc(this.x+position*3*this.radius,this.y,this.radius,this.getRadians(this.currentPadPos),this.getRadians(this.currentPadPos+this.padLength));
    context.lineWidth = 6;
    context.strokeStyle = '#FF0066';
    context.stroke();
  }

  draw_i(context, position, startTime, waitingTime) {
    context.beginPath();
    context.moveTo(this.x+position*3*this.radius, this.y-this.radius);
    context.lineTo(this.x+position*3*this.radius, this.y+this.radius);
    context.lineWidth = 3;

    // set line color
    context.strokeStyle = '#7FFF00';
    context.stroke();

    context.beginPath();
    if(this.currentPadPos<180){
      var toppos = (this.y-this.radius)+((2*this.radius-this.radius*2/3)*this.currentPadPos/180);
    } else {
      var toppos = (this.y-this.radius)+(2*this.radius-this.radius*2/3)-((2*this.radius-this.radius*2/3)*(this.currentPadPos-180)/180);
    }
    context.moveTo(this.x+position*3*this.radius, toppos);
    context.lineTo(this.x+position*3*this.radius, toppos+this.radius*2/3);
    context.lineWidth = 6;

    // set line color
    context.strokeStyle = '#FF0066';
    context.stroke();
  }

  draw(context) {
    this.draw_p(context,0, 0, 0);
    this.draw_o(context,1, 5, 0);
    this.draw_g(context,2, 10, 0);
    this.draw_a(context,3, 15, 0);
    this.draw_r(context,4, 20, 0);
    this.draw_i(context,5, 25, 0);
    this.draw_o(context,6, 30, 0);
  }

  getRadians(dgrs) {
    var degrees = ( Math.PI/180 ) * dgrs;
    return degrees;
  }

}
