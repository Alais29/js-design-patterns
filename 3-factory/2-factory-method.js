/*
TLDR
====
A factory method is a method, and quite often a static method, for manufacturing a new object, and it gives you certain benefits, such as the fact that allows you to be very explicit as about the naming of the method and parameters
*/

// Simple scenario where we'd probably like to use a factory

// CoordinateSystem = {
//   cartesian: 0,
//   polar: 1,
// };

class Point {
  // Let's assume this is a cartesian point so we initialize it with x and y
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // but later in time we want to initialize them with polar coordinates instead, we might be tempted to write a second constructor, but that's not allowed in JS

  // constructor(rho, theta) {
  //   this.x = rho * Math.cos(theta);
  //   this.y = rho * Math.sin(theta);
  // }

  // so instead of that we could define a coordinate system (line 3) and then make a constructor which takes to values and also a cartesian system, which in this case we default to cartesian

  // constructor(a, b, cs = CoordinatSystem.cartesian) {
  //   switch (cs) {
  //     case CoordinatSystem.cartesian:
  //       this.x = a;
  //       this.y = b;
  //       break;
  //     case CoordinatSystem.polar:
  //       this.x = a * Math.cos(b);
  //       this.y = a * Math.sin(b);
  //       break;
  //   }
  // }

  // this is a solution, but it also has some problems, for example, the arguments are called a and b, which doesn't tell you what is expected to be provided, also, what would happen if we'd like to integrate another coordinate system, we'd have to add another case in the switch, which is a violation of the open-close principle

  // this is where the factory method comes in, a factory method is a method that allows you to create an object, and a good thing is that it doesn't have to be called constructor

  // in this case we'd still have the constructor (line 10) and people can use it if they want but this is kind of the fancy way of initializing this point using x and y coordinates and now through the method's name we're giving a hint to the user as to what values they're expected to provide, and also the name of the parameters tell you what's going on
  static newCartesianPoint(x, y) {
    // It's not mandatory that we always return a new instance of the same class, we could return other classes here
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

let p = Point.newCartesianPoint(4, 5);
console.log(p); // Point { x: 4, y: 5 }

let p2 = Point.newPolarPoint(5, Math.PI / 2);
console.log(p2); // Point { x: 3.061616997868383e-16, y: 5 }
