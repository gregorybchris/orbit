export default class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static dist(v1, v2) {
    const dx = v2.x - v1.x;
    const dy = v2.y - v1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static add(v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static sub(v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  static average(v1, v2) {
    return new Vector((v1.x + v2.x) / 2, (v1.y + v2.y) / 2);
  }
}
