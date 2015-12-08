import uuid from 'node-uuid';
import GameMap from './map';
import Player from './player';
import Ball from './ball';
import p2 from 'p2';

export default class Manager {
    constructor(socket) {
        this.players = new Map();
        this.balls = new Map();

        this.uuid = uuid;

        this.initPhysics();

        this.initSocket(socket);

        this.map = new GameMap(this.world, this.wall_material, this.stage);
        this.ball = this.addBall();
    }

    initPhysics() {
        this.world = new p2.World({
            gravity: [0, 0]
        });

        this.ball_material = new p2.Material();
        this.wall_material = new p2.Material();
        this.player_material = new p2.Material();

        this.world.addContactMaterial(new p2.ContactMaterial(this.ball_material, this.wall_material, {
            restitution: 1.0,
            stiffness: Number.MAX_VALUE
        }));

        this.world.addContactMaterial(new p2.ContactMaterial(this.ball_material, this.player_material, {
            restitution: 1.0,
            stiffness: Number.MAX_VALUE
        }));
    }

    initSocket(socket) {
        this.socket = socket;

        this.socket.on('connection', (socket) => {
            var uuid = this.uuid.v1(),
                client = socket;
            client.uuid = uuid;
            client.emit('connected', uuid);

            this.addPlayer(uuid, client);

            this.balls.forEach((ball) => {
                client.emit('add ball', ball.uuid);
            });

            this.players.forEach((player) => {
                client.emit('add player', player.uuid);
            });

            console.log('player connected: ' + uuid);

            client.emit('time sync', new Date().getTime());

            socket.on('disconnect', () => {
                console.log('player disconnected: ' + uuid);
                this.deletePlayer(uuid);
            });
        });
    }

    addPlayer(uuid, socket) {
        this.player = new Player(uuid, this.socket, socket, this.world, this.player_material);
        this.players.set(uuid, this.player);

        this.socket.emit('add player', this.player.uuid);

        return this.player;
    }

    deletePlayer(uuid) {
        if (this.players.has(uuid)) {
            this.players.get(uuid).clear();
            this.players.delete(uuid);

            this.socket.emit('delete player', uuid);
        }
    }

    addBall() {
        var uuid = this.uuid.v1();
        this.ball = new Ball(uuid, this.socket, this.world, this.ball_material);
        this.balls.set(uuid, this.ball);

        this.socket.emit('add ball', this.ball.uuid);

        return this.ball;
    }

    deleteBall(uuid) {
        if (this.balls.has(uuid)) {
            this.balls.get(uuid).clear();
            this.balls.delete(uuid);
        }
    }

    update(delta) {
        this.players.forEach(function (player, index) {
            player.update(delta);
        });

        this.balls.forEach((ball, index) => {
            ball.update(delta);
        });

        this.world.step(1 / 60, delta * 1000, 10);
    }
}