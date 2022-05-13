/*
=======
TLDR
=======
Instead of returning differente instances from the constructor, we make sure that all the data is shared between every single instance, so we initialize it outside of the scope of the actual class, but inside the class we provide the getters and setters that allow us to access or mutate those shared properties 
*/

// Another way of implementing the singleton design pattern is called the Monostate, it's similar to the previous implementation, but its difference is that it does not modify the constructor, instead of that its built in a way that every single instance of a class shares all their data by using getters and setters.

// We can have getters and setters for different properties, but instead of storing those properties at the instance level of the class we store them at the class level (line 21), we use an undersocre to these variables to indicate that they are not meant to be consumed directly, but through the getters and setters (line 6, 9, 13, 16)

class ChiefExecutiveOfficer {
  get name() {
    return ChiefExecutiveOfficer._name;
  }
  set name(value) {
    ChiefExecutiveOfficer._name = value;
  }

  get age() {
    return ChiefExecutiveOfficer._age;
  }
  set age(value) {
    ChiefExecutiveOfficer._age = value;
  }

  toString() {
    return `CEO's name is ${this.name} and he is ${this.age} years old.`;
  }
}

ChiefExecutiveOfficer._age = undefined;
ChiefExecutiveOfficer._name = undefined;

// This way, there is only one instance of _age and _name because they exist at the level of chief executive, it's not a per instance thing, the name and age are shared between all the instances

let ceo = new ChiefExecutiveOfficer();
ceo.name = "Adam Smith";
ceo.age = 55;

let ceo2 = new ChiefExecutiveOfficer();
ceo2.name = "John Gold";
ceo2.age = 66;

console.log(ceo.toString()); // CEO's name is John Gold and he is 66 years old.
console.log(ceo2.toString()); // CEO's name is John Gold and he is 66 years old.
