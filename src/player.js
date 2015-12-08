import p2 from 'p2';
import PIXI from 'pixi.js';
import Primitive from './arc';

export default class Player {

    constructor(uuid, socket, stage) {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.pad = 0;
        this.angle = 0;

        this.uuid = uuid;

        this.initRender(stage);

        this.initSocket(socket);
    }

    initRender(stage) {
        this.graphics = new PIXI.Graphics();

        stage.addChild(this.graphics);
    }

    initSocket(socket) {
        this.socket = socket;

        this.socket.on(this.uuid, (value) => {
            this.x = value.x;
            this.y = value.y;
            this.radius = value.radius;
            this.pad = value.pad;
            this.angle = value.angle;
        });
    }
    
    clear() {
        this.graphics.clear();
    }

    draw() {
        this.clear();
        
        this.graphics.lineStyle(5, 0x7FFF00, 1);
        this.graphics.drawCircle(0, 0, this.radius);

        this.graphics.lineStyle(10, 0xFF0066, 1);
        this.graphics.arc(0, 0, this.radius, -this.pad / 2, this.pad / 2);

        this.graphics.x = this.x;
        this.graphics.y = this.y;
        
        this.graphics.rotation = this.angle;
    }
}