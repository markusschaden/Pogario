import p2 from 'p2'
import PIXI from 'pixi.js'

export default class Map {
    constructor(stage) {
        this.x = 0;
        this.y = 0;
        this.width = 500;
        this.height = 500;

        this.initRender(stage);
    }

    initRender(stage) {
        this.graphics = new PIXI.Graphics();

        this.graphics.lineStyle(5, 0xFF0000, 1);
        this.graphics.drawRect(0, 0, this.width, this.height);

        this.graphics.x = this.x;
        this.graphics.y = this.y;

        stage.addChild(this.graphics);
    }

    draw(ctx) {}

    update(delta) {}
}