/**
======
TLDR
======
If you have a finite set of different prototypes that you want to work with, it might make sense to put them into a separate factory and use that factory to provide useful factory methods to instantiate customized copies of these prototypes
*/

// This is a merger of prototype and factory design patterns, why would this be useful? this way you can have a couple of predefined objects and a very nice interfaec on top of that, that takes these objects, customizes them and gives you a nice API, a set of methods for making those copies instead of you having to use the serializer explicitly

// To implement this we're going to have 2 objects:
// 1. Address, which will have a suite, streetAddress and city parameters, a company might have a finite number of offices and all of them share the streetAddress and city, in the sense that if there are 100 people working in a particular office they're all going to have the same streetAddress and city, but the suite number changes

// 2. Employee, which will have a name and adress properties, and where the name gets customized whereas their address is conly customized partly, since we only want to customize the suite number, the other 2 properties will come from the prototype

class Address {
  constructor(suite, streetAddress, city) {
    this.suite = suite;
    this.streetAddress = streetAddress;
    this.city = city;
  }

  toString() {
    return `Suite: ${this.suite}, ${this.streetAddress}, ${this.city}`;
  }
}

class Employee {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  toString() {
    return `${this.name} works at ${this.address}`;
  }
}

// We're also going to be reusing the serializer that we built previously

class Serializer {
  constructor(types) {
    this.types = types;
  }

  clone(object) {
    this.markRecursive(object);
    let copy = JSON.parse(JSON.stringify(object));
    return this.reconstructRecursive(copy);
  }

  markRecursive(object) {
    let idx = this.types.findIndex((type) => {
      return type.name === object.constructor.name;
    });

    if (idx !== -1) {
      object["typeIndex"] = idx;

      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null)
          this.markRecursive(object[key]);
      }
    }
  }

  reconstructRecursive(object) {
    if (object.hasOwnProperty("typeIndex")) {
      let type = this.types[object.typeIndex];
      let obj = new type();
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null)
          obj[key] = this.reconstructRecursive(object[key]);
      }
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }
}

// First of all, we're going to define the actual prototype, first we define an EmployeeFactory class and then we define the offices where people can work, which will be the prototypes, we create 2 employees as properties of the EmployeeFactory, a main one and an auxiliary one, both will have null for the name property, since it'll be customized, and will also have null for the suite property of the adress since this will also be customized. We'll also add an isntance of the Serializer itself to the EmployeeFactory at the class level (lines 80, 81, 85)

class EmployeeFactory {
  // Here we need to have some sort of non public utility method, we need to suggest that these methods will be used internally inside the class, and should not be called externally

  // We start with a method called _newEmployee (the underscore suggests that this method is not public), which will create a new employee from a given prototype
  static _newEmployee(proto, name, suite) {
    // the method will receive the prototype, and the name and suite to be customized

    // it copies the prototype using the serializer
    let copy = EmployeeFactory.serializer.clone(proto);
    // customizes the copy
    copy.name = name;
    copy.address.suite = suite;
    //and returns it
    return copy;
  }

  // and then we have the public methods, the ones that people should use, these methods will be used for creating a new main office and auxiliary office employee
  static newMainOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.main, name, suite);
  }
  static newAuxOfficeEmployee(name, suite) {
    return this._newEmployee(EmployeeFactory.aux, name, suite);
  }
}

EmployeeFactory.serializer = new Serializer([Employee, Address]);
EmployeeFactory.main = new Employee(
  null,
  new Address(null, "123 East Dr", "London")
);
EmployeeFactory.aux = new Employee(
  null,
  new Address(null, "200 London Rd", "Oxford")
);

let john = EmployeeFactory.newMainOfficeEmployee("John", 4321);
let jane = EmployeeFactory.newAuxOfficeEmployee("Jane", 222);

console.log(john.toString());
console.log(jane.toString());
