import SAT from 'sat'
import Victor from 'victor'
    
// Converts from degrees to radians.
Math.radians = function (degrees) {
    return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function (radians) {
    return radians * 180 / Math.PI;
};
    
export default class Geometry {
    constructor() {}
    
    static collisionMapBall(map, ball) {
        if ((ball.direction.x > 0) && (ball.x + ball.radius > map.width + map.x)) {
            ball.x = map.width + map.x - ball.radius;
            ball.direction.invertX();
        } else if ((ball.direction.x < 0) && (ball.x - ball.radius < map.x)) {
            ball.x = map.x + ball.radius;
            ball.direction.invertX();
        }

        if ((ball.direction.y > 0) && (ball.y + ball.radius > map.height + map.y)) {
            ball.y = map.height + map.y - ball.radius;
            ball.direction.invertY();
        } else if ((ball.direction.y < 0) && (ball.y - ball.radius < map.y)) {
            ball.y = map.y + ball.radius;
            ball.direction.invertY();
        }
    }
    
    static collisionPlayerBall(player, ball) {
        var circle = new SAT.Circle(new SAT.Vector(ball.x, ball.y), ball.radius);
        var circlePlayer = new SAT.Circle(new SAT.Vector(player.x, player.y), player.radius);
        var response = new SAT.Response();
        if (SAT.testCircleCircle(circle, circlePlayer, response)) {
            var angleBall = new Victor(ball.x - player.x, ball.y - player.y).angleDeg();
            angleBall = (angleBall < 0) ? 360 + angleBall : angleBall;

            if (Math.abs(angleBall - player.currentPadPos) < player.padLength / 2) {
                ball.direction.invert();
                ball.direction.rotateDeg(90 * (angleBall - player.currentPadPos) / (player.padLength / 2));
                //player.radius += 5;
            } else {
                ball.x = 10;
                ball.y = 10;
            }
        }
    }
}