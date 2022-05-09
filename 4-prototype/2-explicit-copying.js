// Let's say we want to create a person with name and address, we have a class for Person and also a class for Address because it's a composite object
class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
  }

  deepCopy() {
    return new Address(this.streetAddress, this.city, this.country);
  }

  toString() {
    return `Address: ${this.streetAddress}, ${this.city}, ${this.country}`;
  }
}

class Person {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  deepCopy() {
    return new Person(this.name, this.address.deepCopy());
  }

  toString() {
    return `${this.name} lives at ${this.address}`;
  }
}

// Then we create John
let john = new Person("John", new Address("123 London Road", "London", "UK"));

// John can serve as a prototype for aditional people that happen to live in the same building as John, meaning that instead of instantiating their address again, we might want to copy it, and customize it a little bit in the case that it's not exactly the same building

// So how do we go around making a copy of john? that's the key question of the whole prototype design pattern

// we could try it like this (which is wrong, but let's see why)
/*
let jane = john;
jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

console.log(john.toString()); // Jane lives at Address: 321 Angel St, London, UK
console.log(jane.toString()); // Jane lives at Address: 321 Angel St, London, UK
*/

// on line 42 all we did was overwrite the reference, so we now have that both jane and john refer to the same object in memory.

// There are different ways to really make a copy, but the one we're going to use is where we're going to support copying explicetely.

// We could add a new method to copy a person by creating a new one (line 24), although this won't work either

let jane = john.deepCopy();
jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

console.log(john.toString()); // John lives at Address: 321 Angel St, London, UK
console.log(jane.toString()); // Jane lives at Address: 321 Angel St, London, UK

// Now their names are different, but their address are still the same, why? the problem is that when we pass the address in the deepCopy method, unlike with the string where it gets copied as a whole and it can be customized, the address is still a reference, so both the original object as well as the deep copied one still refer to the same address, so what we need to do is to deepCopy the address as well (line 9 and 25)

// This will actually now work and we will get 2 different objects on line 60 ans 61

// There is a limitation to this approach though, if you have objects, which use other objects, which other objects and so on, then you have to implement deepCopy for every single composite object in the entire object model
