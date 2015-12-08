export default class Arc {

    constructor() {}

    static arc(radius, width, angle) {
        var sides = radius * angle / (Math.PI * 2),
            theta = angle / sides,
            offset = -angle * 0.5,
            half = width / 2,
            outer_radius = radius + half,
            inner_radius = radius - half,
            path = [],
            counter = 0;

        for (var i = sides - 1; i >= 0; i -= 1) {
            var angle = offset + (i * theta),
                xx = Math.cos(angle) * inner_radius,
                yy = Math.sin(angle) * inner_radius;

            path.push([xx, yy]);
            counter += 1;
        }

        for (var i = 0; i < sides; i += 1) {
            var angle = offset + (i * theta),
                xx = Math.cos(angle) * outer_radius,
                yy = Math.sin(angle) * outer_radius;

            path.push([xx, yy]);
            counter += 1;
        }

        return path;
    }
}