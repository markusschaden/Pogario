import p2 from 'p2';
import CollisionGroup from './collisiongroup';

export default class Ball {
    constructor(uuid, socket, world, material) {
        this.radius = 15;
        this.x = 50;
        this.y = 50;

        this.uuid = uuid;
        this.socket = socket;

        this.initPhysics(world, material);
    }

    initPhysics(world, material) {
        this.circleBody = new p2.Body({
            mass: 5,
            position: [this.x, this.y],
            velocity: [50, 10]
        });
        this.circleBody.damping = 0;
        this.circleBody.angularDamping = 0;

        this.circleShape = new p2.Circle({
            radius: this.radius,
            collisionGroup: CollisionGroup.BALL(),
            collisionMask: CollisionGroup.PLAYER_PAD() | CollisionGroup.BALL() | CollisionGroup.WALL()
        });

        this.circleShape.material = material;
        this.circleBody.addShape(this.circleShape);
        world.addBody(this.circleBody);
    }

    update(delta) {
        if (Math.abs(this.circleBody.velocity[0]) < 30) {
            if (this.circleBody.velocity[0] == 0)
                this.circleBody.velocity[0] = 1;
            this.circleBody.velocity[0] *= 1.1;
        }
        if (Math.abs(this.circleBody.velocity[1]) < 30) {
            if (this.circleBody.velocity[1] == 0)
                this.circleBody.velocity[1] = 1;
            this.circleBody.velocity[1] *= 1.1;
        }
        
        this.socket.emit(this.uuid + ' moved', {
            x: this.circleBody.position[0],
            y: this.circleBody.position[1]
        });
    }
}