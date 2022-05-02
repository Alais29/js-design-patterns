class Person {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

class PersonFactory {
  createPerson(name) {
    return new Person(PersonFactory.id++, name);
  }
}
PersonFactory.id = 0;
