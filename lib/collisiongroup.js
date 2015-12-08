export default class CollisionGroup {
    static DEFAULT() {
        return 1;
    }
    static BALL() {
        return 2;
    }
    static PLAYER() {
        return 4;
    }
    static PLAYER_PAD() {
        return 8;
    }
    static WALL() {
        return 16;
    }
}