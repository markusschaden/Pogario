import GameMap from './map';
import Player from './player';
import Ball from './ball';
import p2 from 'p2';
import PIXI from 'pixi.js';

export default class Manager {
    constructor(socket) {
        this.players = new Map();
        this.balls = new Map();

        this.uuid = '';

        this.initRender();

        this.initSocket(socket);

        this.map = new GameMap(this.stage);
    }

    initRender() {
        this.renderer = new PIXI.autoDetectRenderer(500, 500, {
            antialias: true
        });
        document.body.appendChild(this.renderer.view);
        this.stage = new PIXI.Container();

        // corrects coordinate system for p2.js
        this.stage.scale.y = -1;
        this.stage.x = 0;
        this.stage.y = 500;
    }

    initSocket(socket) {
        this.socket = socket;

        this.socket.on('connected', (uuid) => {
            this.uuid = uuid;
        });

        this.socket.on('add ball', this.addBall.bind(this));
        this.socket.on('add player', this.addPlayer.bind(this));
        this.socket.on('delete ball', this.deleteBall.bind(this));
        this.socket.on('delete player', this.deletePlayer.bind(this));
    }

    addPlayer(uuid) {
        this.player = new Player(uuid, this.socket, this.stage);
        this.players.set(uuid, this.player);

        return this.player;
    }

    deletePlayer(uuid) {
        if (this.players.has(uuid)) {
            this.players.get(uuid).clear();
            this.players.delete(uuid);
        }
    }

    addBall(uuid) {
        this.ball = new Ball(uuid, this.socket, this.stage);
        this.balls.set(uuid, this.ball);
        return this.ball;
    }

    deleteBall(uuid) {
        if (this.balls.has(uuid)) {
            this.balls.get(uuid).clear();
            this.balls.delete(uuid);
        }
    }

    draw(context) {
        this.map.draw(context);
        this.players.forEach(function (player, index) {
            player.draw();
        });

        this.balls.forEach(function (ball, index) {
            ball.draw(context);
        });

        this.renderer.render(this.stage);
    }
}