/* 
========
A class should have a single primary responsability and therefore it should only have one reason to change, that reason being somehow related to its responsability
========
*/

const fs = require("fs");
const path = require("path");

class Journal {
  constructor() {
    this.entries = {};
  }

  // The primary responsability of the journal is to add and remove entries
  addEntry(text) {
    let c = ++Journal.count;
    let entry = `${c}: ${text}`;
    this.entries[c] = entry;
    return c;
  }

  removeEntry(index) {
    delete this.entries[index];
  }

  toString() {
    return Object.values(this.entries).join("\n");
  }

  // If we wanted to add persistence, we could do it here and it will work but it may become a problem later since we've now added a second responsability to the general class. Imagine we have some behaviors which are specific to serialisation, specific to the saving of data, for example some process, like removing the index before saving them to a file or some other process before loading the file; now the problem is that imagine that a Journal is not the only object in the system, imagine we have 10 different types that you want to serialize to files and load from files, How can we have common operations on all those objects? It will be really difficult (Continue on line 45)
  // save(filename) {
  //   fs.writeFileSync(filename, this.toString());
  // }

  // load(filename) {
  //   //
  // }

  // loadFromUrl(filename) {
  //   //
  // }
}

//It might be a better idea to take all the operations related to persistance and add them to a separate component that can subsequently be generalized for handling different types of objects, not just journal entries

// This way is better for organization and for understanding what the code actually does and where the modifications need to happen, so we know that if our files aren't being saved correctly, we don't have to look in 10 different places, we just need to look inside the persistance manager.

class PersistenceManager {
  preprocess(j) {
    // We could have some preprocessing method that we could then apply uniformly accross the entire persistance manager. Instead of having to hunt through a lot of classes modifying their serialization operations, you just keep everything local, so you keep everything right where the persistance functionality is.
  }

  saveToFile(journal, filename) {
    fs.writeFileSync(filename, journal.toString());
  }

  load(filename) {
    //
  }

  loadFromUrl(filename) {
    //
  }
}

Journal.count = 0;

let j = new Journal();
j.addEntry("I cried today.");
j.addEntry("I ate a bug.");
console.log(j.toString());

let p = new PersistenceManager();
let filename = path.resolve(__dirname + "/single-resp.txt");
p.saveToFile(j, filename);
