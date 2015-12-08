import p2 from 'p2';
import CollisionGroup from './collisiongroup';

export default class Map {
    constructor(world, material) {
        this.x = 0;
        this.y = 0;
        this.width = 500;
        this.height = 500;

        this.initPhysics(world, material);
    }

    initPhysics(world, material) {
        this.topBody = new p2.Body({
            mass: 0,
            position: [this.x, this.height],
            angle: Math.PI
        });
        this.topShape = new p2.Plane({
            collisionGroup: CollisionGroup.WALL(),
            collisionMask: CollisionGroup.PLAYER() | CollisionGroup.BALL()
        });
        this.topShape.material = material;
        this.topBody.addShape(this.topShape);
        world.addBody(this.topBody);

        this.bottomBody = new p2.Body({
            mass: 0,
            position: [this.x, this.y],
        });
        this.bottomShape = new p2.Plane({
            collisionGroup: CollisionGroup.WALL(),
            collisionMask: CollisionGroup.PLAYER() | CollisionGroup.BALL()
        });
        this.bottomShape.material = material;
        this.bottomBody.addShape(this.bottomShape);
        world.addBody(this.bottomBody);

        this.leftBody = new p2.Body({
            mass: 0,
            position: [this.x, this.y],
            angle: -Math.PI / 2
        });
        this.leftShape = new p2.Plane({
            collisionGroup: CollisionGroup.WALL(),
            collisionMask: CollisionGroup.PLAYER() | CollisionGroup.BALL()
        });
        this.leftShape.material = material;
        this.leftBody.addShape(this.leftShape);
        world.addBody(this.leftBody);

        this.rightBody = new p2.Body({
            mass: 0,
            position: [this.width, this.y],
            angle: Math.PI / 2
        });
        this.rightShape = new p2.Plane({
            collisionGroup: CollisionGroup.WALL(),
            collisionMask: CollisionGroup.PLAYER() | CollisionGroup.BALL()
        });
        this.rightShape.material = material;
        this.rightBody.addShape(this.rightShape);
        world.addBody(this.rightBody);
    }

    update(delta) {}
}