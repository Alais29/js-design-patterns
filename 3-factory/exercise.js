/*
You are given a class called Person. The person has two fields: id and name.

Please implement a PersonFactory that has a non-static createPerson() method that takes a person's name and returns a person initialized with this name and an id.

The id of the person should be set as a 0-based index of the object any instance of PersonFactory has created. So, the first person any factory makes should have Id=0, second Id=1 and so on.
*/

class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  constructor() {
    this.persons = [];
  }
  createPerson(name) {
    // todo
    const id = this.persons.length;
    this.persons.push({ id, name });
    return new Person(id, name);
  }
}

const person = new PersonFactory();
person.createPerson("Juan");
person.createPerson("Pedro");
person.createPerson("María");

console.log(person.persons);
// [
//   { id: 0, name: "Juan" },
//   { id: 1, name: "Pedro" },
//   { id: 2, name: "María" },
// ];
