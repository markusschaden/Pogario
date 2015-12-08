import p2 from 'p2';
import PIXI from 'pixi.js';

export default class Ball {
    constructor(uuid, socket, stage) {
        this.radius = 15;
        this.x = 50;
        this.y = 50;

        this.uuid = uuid;

        this.initRender(stage);

        this.initSocket(socket);
    }

    initRender(stage) {
        this.graphics = new PIXI.Graphics();

        this.graphics.lineStyle(5, 0x3333AA, 1);
        this.graphics.beginFill(0x0000FF, 1);
        this.graphics.drawCircle(0, 0, this.radius);

        this.graphics.x = this.x;
        this.graphics.y = this.y;

        stage.addChild(this.graphics);
    }

    initSocket(socket) {
        this.socket = socket;

        this.socket.on(this.uuid + ' moved', this.moved.bind(this));
    }

    draw(ctx) {
        this.graphics.x = this.x;
        this.graphics.y = this.y;
    }

    update(delta) {}

    moved(pos) {
        this.x = pos.x;
        this.y = pos.y;
    }
}