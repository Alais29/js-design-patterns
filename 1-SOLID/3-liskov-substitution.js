/*
=======
If you have some function or method, which takes some base type or class (like Rectangle), it should also equally be able to take a derived type or class (like Square) without breaking the functionality
=======
*/

// Let's say we have a rectangle class
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  toString() {
    return `${this.width} x ${this.height}`;
  }
}

// And let's imagine that along the way we decide to create a new class to create a square, but when working with the square we want to enforce that it always has the same width and height
class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }
}

let rc = new Rectangle(2, 3);
console.log(rc.toString());

// The problem is that we have to enforce this (width and height being lways the same) somehow otherwise we could do this:

const sq = new Square(5);
console.log(sq.toString()); // 5 x 5
sq.width = 10;
console.log(sq.toString()); // 10 x 5

// one dangerous way of fixing the problem is to rewrite both classes to use getters and setters instead of ordinary fields as so:

class Rectangle2 {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }
  get height() {
    return this._height;
  }

  set width(value) {
    this._width = value;
  }
  set height(value) {
    this._height = value;
  }

  get area() {
    return this._width * this._height;
  }

  toString() {
    return `${this._width} × ${this._height}`;
  }
}

class Square2 extends Rectangle2 {
  constructor(size) {
    super(size, size);
  }

  set width(value) {
    this._width = this._height = value;
  }

  set height(value) {
    this._width = this._height = value;
  }
}

// now of course if we modify the quare it will remain as a square

let rc2 = new Rectangle2(2, 3);
console.log(rc2.toString());

let sq2 = new Square2(5);
console.log(sq2.toString()); // 5 x 5
sq2.width = 10;
console.log(sq2.toString()); // 10 x 10

// the problem is that you can have functions which work with the base class Rectangle but  fail with a derived class, for example:

let useIt = function (rc) {
  // this function takes a rectangle as a parameter, since it takes a rectangle, it could equally take a square becuase the square is derived from rectangle and they share an interface so it should be ok
  let width = rc._width;
  rc.height = 10;
  // if i'm working with a rectangle my assumption is that the area of this rectangle will be 10 x width
  console.log(`Expected area of ${10 * width}, got ${rc.area}`);
};

let rc3 = new Rectangle2(2, 3);
useIt(rc3); // Expected area of 20, got 20

let sq3 = new Square2(5);
useIt(sq3); // Expected area of 50, got 100
