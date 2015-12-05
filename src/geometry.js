export default class Geometry {
    constructor() {}    
    
    static containsCircleCircle(circle1, circle2) {
        var dx = circle1.x - circle2.x;
        var dy = circle1.y - circle2.y;
        var distance = Math.sqrt(dx * dx + dy * dy);

        return (distance < circle1.radius + circle2.radius);
    }

    static containsBoxBox(box1, box2) {
        return (box1.x < box2.x + box2.width &&
            box1.x + box1.width > box2.x &&
            box1.y < box2.y + box2.height &&
            box1.height + box1.y > box2.y);
    }

    static containsCircleBox(circle, box) {
        var distX = Math.abs(circle.x - box.x - box.width / 2);
        var distY = Math.abs(circle.y - box.y - box.height / 2);

        if (distX > (box.width / 2 + circle.radius)) {
            return false;
        }
        if (distY > (box.height / 2 + circle.radius)) {
            return false;
        }

        if (distX <= (box.width / 2)) {
            return true;
        }
        if (distY <= (box.height / 2)) {
            return true;
        }

        var dx = distX - box.width / 2;
        var dy = distY - box.height / 2;
        return (dx * dx + dy * dy <= (circle.radius * circle.radius));
    }
}