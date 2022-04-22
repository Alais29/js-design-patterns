/*
TLDR
====
A factory is just a separate class which takes the responsability of creating objects of a particular type 
*/

/*
A factory takes into account the single responsability principle, if we have this separate responsability of creating objects using a factory, and a factory might have methods inside it that are specific to doing some sort of calculations or storing some data, it might make sense to follow the single repsonsability principle and take them out of the object and put them into a separate class
 */

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// So we create a new class, which will have the single responsability of the creation of points, so now we take all of the static methods from the Point class

class PointFactory {
  static newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  static newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

let p = PointFactory.newCartesianPoint(4, 5);
console.log(p); // Point { x: 4, y: 5 }

let p2 = PointFactory.newPolarPoint(5, Math.PI / 2);
console.log(p2);

// It's up to you how to expose the factories themselves, here we made it so we can call the static methods without instantiating the PointFactory class, we could make the methods not static, so it will allow people to instantiate their own factories, although this only make sense if the factory actually needs to store some data for example

// Another thing that we can do if we want to suggest to the user that they shouldn't be using the constructor (Point) but the factory instead, is maybe expoise the factory right from the object which the factory creates (Point), obviously this introduces a bit of coupling because all of a sudden the factory and the object are coupled together and it brakes the open-close principle but it does gives you the benefit of a nicer API (line 11)

// The classes would then look like this:

/*
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get factory() {
    return new PointFactory();
  }
}

class PointFactory {
  newCartesianPoint(x, y) {
    return new Point(x, y);
  }

  newPolarPoint(rho, theta) {
    return new Point(rho * Math.cos(theta), rho * Math.sin(theta));
  }
}

let p3 = Point.factory.newCartesianPoint(6, 10);
*/

// Both ways work, it's really upto you if you want to only return one instance of PointFactory (Singleton, this would be the first case mentioned) or if you want to return a brand new instance every time some calls the factory getter in Point
