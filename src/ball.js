import Victor from 'victor'

export default class Ball {
    constructor() {
        this._radius = 15;
        this._x = 50;
        this._y = 3*canvas.width/21 + 70;
        this._direction = new Victor(0.25, 0.25);
    }

    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get direction() {
        return this._direction;
    }
    set direction(direction) {
        this._direction = direction;
    }
    get radius() {
        return this._radius;
    }
    set radius(radius) {
        this._radius = radius;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this._x, this._y, this._radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#3333AA';
        ctx.stroke();
        ctx.closePath();
    }

    update(delta) {
        this._x += this._direction.x * delta;
        this._y += this._direction.y * delta;
    }
}
