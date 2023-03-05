/*
======
TLDR
======
You use a protection proxy to control access to a particular resource while preserving the interface as much as you can and making sure that only those who are allowed to touch the resource can actually call the underlying resource 
*/

// You use a protection proxy to control access to a particular resource, you have a resource in an unguarded state and make a wrapper which tries to mimic the interface of the original object as much as possible so that it can be almost swapped in, but it performs additional checks and protections

// Suppose we hava a Car class, which has a method drive
class Car {
  drive() {
    console.log(`Car is being driven`)
  }
}

// but then at some point you decide you have to authenticate the user, make sure that the driver is old enough

// so we add a Driver definitiion, which will have the driver's age 
class Driver {
  constructor(age) {
    this.age = age
  }
}

// and we specify that whenever somebady wants to use the car they have to use a proxy, which will also have a drive method (a proper proxy replicates the interface)
class CarProxy {
  // but this time we'll slightly change the interface, we'll say that you can only have a car if you tell us who the driver is
  constructor(driver) {
    // so we store the driver, and the _car (_ being a hint that the car should not be accessed directly)
    this.driver = driver
    this._car = new Car()
  }

  drive() {
    // this time we need to make sure that the driver can actually drive the car
    if (this.driver.age >= 16) this._car.drive()
    else console.log(`Driver too young`)
  }
}

// without the protection proxy, we had a car and we could simply call car.drive(), no protection whatsoever
let car = new Car()
car.drive() // Car is being driven

// with the proxy, we have to pass a driver and if the driver is too young it won't allow it to drive the car
let car2 = new CarProxy(new Driver(12))
let car3 = new CarProxy(new Driver(20))
car2.drive(); // Driver too young
car3.drive(); // Car is being driven
