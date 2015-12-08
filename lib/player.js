import p2 from 'p2';
import Primitive from '../src/arc';
import CollisionGroup from './collisiongroup';

export default class Player {
    constructor(uuid, socket, client, world, material) {
        this.name = 'unnamed'

        this.x = 300;
        this.y = 300;

        this.radius = 70;
        this.pad = Math.PI / 3;
        this.angle = 0;
        this.maxSpeed = 10;
        this.step = Math.PI;
        this.direction = 0;

        this.uuid = uuid;

        this.initPhysics(world, material);

        this.initSocket(socket, client);
    }

    initPhysics(world, material) {
        this.world = world;

        this.body = new p2.Body({
            mass: 10,
            position: [this.x, this.y],
        });

        this.outerShape = new p2.Circle({
            radius: this.radius * 2,
            collisionGroup: CollisionGroup.PLAYER(),
            collisionMask: CollisionGroup.PLAYER() | CollisionGroup.WALL()
        });
        this.body.addShape(this.outerShape);

        this.circleShape = new p2.Circle({
            radius: this.radius,
            collisionResponse: false
        });
        this.body.addShape(this.circleShape);

        this.convexShape = new p2.Convex({
            vertices: Primitive.arc(this.radius, 10, this.pad),
            collisionGroup: CollisionGroup.PLAYER_PAD(),
            collisionMask: CollisionGroup.WALL() | CollisionGroup.BALL()
        });
        this.convexShape.material = material;
        this.body.addShape(this.convexShape);
        world.addBody(this.body);
    }

    initSocket(socket, client) {
        this.socket = socket;
        this.client = client;

        this.client.on('start', this.start.bind(this));
        this.client.on('move left', this.moveLeft.bind(this));
        this.client.on('move right', this.moveRight.bind(this));
        this.client.on('move stop', this.moveStop.bind(this));
    }

    clear() {
        this.world.removeBody(this.body);
    }

    update(delta) {
        this.angle += this.direction * this.step * delta / 1000;
        if (this.angle < 0)
            this.angle += 2 * Math.PI;

        this.body.angle = this.angle;

        this.socket.emit(this.uuid, {
            x: this.body.position[0],
            y: this.body.position[1],
            radius: this.radius,
            pad: this.pad,
            angle: this.body.angle
        });
    }

    start(name) {
        this.name = name;

        console.log(`started as ${this.name}`);
        this.client.broadcast.emit(this.uuid + ' started', this.name);
    }

    moveLeft() {
        this.direction = 1;
    }

    moveRight() {
        this.direction = -1;
    }

    moveStop() {
        this.direction = 0;
    }
}