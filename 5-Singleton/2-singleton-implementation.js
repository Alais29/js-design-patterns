/*
======
TLDR
======
We alter the behavior of the constructor, so that whenever you call the constructor with "new" what really happens is that we don't always get a new object, we only get a new object on the first invocation, afterwards we always get the same first object
*/

// Every class has a constructor, which is an object that can have fields and behaviors of its own, so what we do here is that if the constructor has never been called by anyone then we jump right to line 18, which takes the current instance being called and assigns it to the constructor.

// But if anyone calls the constructor afterwards, then we try to get the constructed instance as this.constructor.instance (line 14), and this time it will exist so we return that already created instance. As a result then the first instance created is the one that will always be returned

class Singleton {
  constructor() {
    const instance = this.constructor.instance;
    if (instance) {
      return instance;
    }
    this.constructor.instance = this;
  }
}

// gets an ordinary instance of the class
let s1 = new Singleton();

// the s1 instance is the one that will be returned here as well
let s2 = new Singleton();

console.log("Are they identical? " + (s1 === s2)); // true
