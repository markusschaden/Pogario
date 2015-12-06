import Map from './map'
import Player from './player'
import Ball from './ball'
import Geometry from './geometry'

export default class Manager {
    constructor() {
        this.map = new Map();
        this.players = [];
        this.balls = [];
    }

    startSinglePlayer() {
        this.balls.push(new Ball());
    }
    
    newPlayer() {        
        this.player = new Player();
        this.players.push(this.player);
        return this.player;
    }
    
    newBall() {        
        this.ball = new Ball();
        this.balls.push(this.ball);
        return this.ball;
    }
    
    update(delta) {
        this.players.forEach(function (player, index) {
            player.update(delta);
        });

        this.balls.forEach((ball, index) => {
            ball.update(delta);

            Geometry.collisionMapBall(this.map, ball);
            this.players.forEach(function (player, index) {
                Geometry.collisionPlayerBall(player, ball);
            });
        });
    }

    draw(context) {
        this.map.draw(context);
        this.players.forEach(function (player, index) {
            player.draw(context);
        });

        this.balls.forEach(function (ball, index) {
            ball.draw(context);
        });
    }
}