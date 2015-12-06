export default class Map {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._width = 500;
        this._height = 500;
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
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeRect(this._x, this._y, this._width, this._height);
        ctx.closePath();
    }

    update(delta) {}
}