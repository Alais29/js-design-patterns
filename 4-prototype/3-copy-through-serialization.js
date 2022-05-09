// So, previously we saw the idea of implementing a deepCopy method for every single object, can we avoid this and not implement this deepCopy method ourselves? the answer is yes, and this can be done by simply serializing the object to some data format and then deserializing it from that format.

// But there are issues to this and that's why we're going to modify our previous example as to see those issues. First we'll add a new method called greet to the Person class, this is to see certain problems in actually getting this method to be present when we serialize and deserialize the object

class Address {
  constructor(streetAddress, city, country) {
    this.streetAddress = streetAddress;
    this.city = city;
    this.country = country;
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

  toString() {
    return `${this.name} lives at ${this.address}`;
  }

  greet() {
    console.log(
      `Hi, my name is ${this.name}, I live at ${this.address.toString()}`
    );
  }
}

let john = new Person("John", new Address("123 London Road", "London", "UK"));

// the idea of the serialization approach is to instead of using deepCopy we use serialization, for example with JSON. This will only work to some degree

/*
let jane = JSON.parse(JSON.stringify(john));
jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

console.log(john.toString()); // John lives at Address: 321 Angel St, London, UK
console.log(jane.toString()); // [object Object]

// If we run this demo we'll get certain limitations when we call jane.toString(), furthermore if we try to use the greet method, it will fail

jane.greet(); // jane.greet() is not a function
*/

// and this is because when we JSON.parse something, we basically have a data structure that has no relation to the class Person whatsoever, it's just a dictionary of different values.

// What we need to do is build some sort of serializer that is aware of the types that we're turning those strings into, we want a dedicated object which properly serializes and deserializes objects and this is the complicated part of this prototype implementation.

// So we create a class called Serializer (line 61) which is going to be aware of the types that it supports. Although this approach also has certain limitations on the whole model because you have to basically be aware of the types that you do have to serialize, in this case we know those types are Person and Address

// so we create a clone method in the Serializer class (line 66) which is going to serialize and deserialize the object, before that, there's something we need to do. When we serialize an object into JSON, no part of that JSON contains information about what type that object was, so we can mark those objects with aditional information specifying the type of those objects that are being serialized o deserialized

// so we also add a separate method called markRecursive (line 75), that takes an object and goes through it in a recursive fashion and tries to find the types inside this.types corresponding to the different parts of the object and if it finds those types then it adds them as aditional data of that object

class Serializer {
  constructor(types) {
    this.types = types;
  }

  clone(object) {
    // so we first mark the object and its subobjects with the type
    this.markRecursive(object);
    // we serialize and deserialize it
    let copy = JSON.parse(JSON.stringify(object));
    // and then we reconstruct this object recursively
    return this.reconstructRecursive(copy);
  }

  markRecursive(object) {
    // we first need to find the index of the object type in this.types
    let idx = this.types.findIndex((type) => {
      return type.name === object.constructor.name;
    });

    // if we find the type then we need to imbue the object that we're working with, with the index of that type. So now every composite object that we know about has an index inside it
    if (idx !== -1) {
      object["typeIndex"] = idx;

      // but we need to do this recursively so we go through every key inside the object and if the object has its own property (we check that the property belongs to the type itself rather than something the object got inherited. we want to avoid working with the inherited information) then we call this method recursively
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null)
          this.markRecursive(object[key]);
      }
    }
  }

  reconstructRecursive(object) {
    // Here we need to check wether this object has a typeIndex or not
    if (object.hasOwnProperty("typeIndex")) {
      // if it does, first we need to get the associated type
      let type = this.types[object.typeIndex];
      // then we make an instance of that type
      let obj = new type();
      // then we need to make sure that every single property of object actually gets assigned, gets written into obj, only the properties (name, address), the methods already exist in the obj instance, and remember that his has to be recursive, because if obj has an address, the address also has to be reconstructed using the same method
      for (let key in object) {
        if (object.hasOwnProperty(key) && object[key] !== null)
          obj[key] = this.reconstructRecursive(object[key]);
      }
      // then delete the typeindex in the obj and return it
      delete obj.typeIndex;
      return obj;
    }
    return object;
  }
}

let serializer = new Serializer([Person, Address]);
let jane = serializer.clone(john);

jane.name = "Jane";
jane.address.streetAddress = "321 Angel St";

console.log(john.toString()); // John lives at Address: 123 London Road, London, UK
console.log(jane.toString()); // Jane lives at Address: 321 Angel St, London, UK

jane.greet(); // Hi, my name is Jane, I live at Address: 321 Angel St, London, UK
