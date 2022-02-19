/*
=======
Defines a relationship that you should have between low level modules and high level modules. High Level modules (in the example: Research) should not directly depend on low level modules (in the example: Relationships), and more specifically, they should not depend on some sort of data that should really be private, they should instead depend on abstractions, such as abstract classes or interfaces that enforces the implementation of certain methods

A low level module is something that's close to the mettle, in the example we define exactly the way that relationships can be stored (array, map, etc)

A high level module isn't a module that's concerned with low leel things like storage, it's concerned with more high level stuff like getting the data out, doing some kind of research
*/

let Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2,
});

class Person {
  constructor(name) {
    this.name = name;
  }
}

// LOW-LEVEL MODULE
class RelationshipBrowser {
  constructor() {
    if (this.constructor.name === "RelationshipBrowser")
      throw new Error("RelationshipBrowser is abstract!");
  }

  findAllChildrenOf(name) {}
}

class Relationships extends RelationshipBrowser {
  constructor() {
    super();
    this.data = [];
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child,
    });
  }

  findAllChildrenOf(name) {
    return this.data
      .filter((r) => r.from.name === name && r.type === Relationship.parent)
      .map((r) => r.to);
  }
}

// HIGH LEVEL MODULE

// This high level module directly depends on a the low level module Relationships, if we refactor that module, we would need to refactor this module as well, so it doesn't fulfill the principle, so we can create a RelationshipBrowser abstract class (line 23) to define what the RelationShips class should implement, and we define a method to find all children of a person there (continue on line 69)

// class Research {
//   constructor(relationships) {
//     // find all children of John
//     let relations = relationships.data;
//     for (let rel of relations.filter(
//       (r) => r.from.name === "John" && r.type === Relationship.parent
//     )) {
//       console.log(`John has a child named ${rel.to.name}`);
//     }
//   }
// }

// so now we can rewrite the Research class
class Research {
  constructor(browser) {
    // Notice that we're not really accessing the actual storage mechanics as before
    for (let p of browser.findAllChildrenOf("John")) {
      console.log(`John has a child named ${p.name}`);
    }
  }
}

let parent = new Person("John");
let child1 = new Person("Chris");
let child2 = new Person("Matt");

let rels = new Relationships();
rels.addParentAndChild(parent, child1);
rels.addParentAndChild(parent, child2);

new Research(rels);
