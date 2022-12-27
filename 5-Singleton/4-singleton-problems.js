/*
=======
TLDR
=======
The Singleton can be a problem if you take a direct dependency on it (line 46), but if you introduce it as a dependency as a constructor parameter (line 92), then the problem goes away, because this way you can provde whatever instance of the DB you want to work with.
*/

const fs = require('fs')
const test = require('node:test')
const assert = require('node:assert/strict');
const path = require('path')

// We'll build a class that's going to ensure it's a singleton and with it we'll get the information from the DB, in this case, the text file capitals.txt
class MyDatabase {
  constructor() {
    const instance = this.constructor.instance
    if (instance) return instance
    this.constructor.instance = this

    console.log(`Initializing database`);
    this.capitals = {}

    // we'll read the text file to load the capitals
    let lines = fs.readFileSync(path.join(__dirname, 'capitals.txt')).toString().split('\n');

    for (let i = 0; i < lines.length / 2; i++) {
      this.capitals[lines[2*i]] = parseInt(lines[2*i+1])
    }

    console.log('CITIES', this.capitals)
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

// We can treat this implementation of the Singleton as a "LOW LEVEL MODULE"

// Now we build a "HIGH LEVEL MODULE"

// The idea behind this class is that it helps us find records matching certain criteria. In this case, the total population of several different cities
class SingletonRecordFinder {
  totalPopulation(cities) {
    return cities
      .map(city => new MyDatabase().getPopulation(city))
      .reduce((x, y) => x + y)
  }
}

// This might look like a good implementation, up until de point where you actually start writing tests for it, let's use node 18 native tester to write some tests

test('singleton database', function () {
  // test passes
  test('is a singleton', function () {
    const db1 = new MyDatabase()
    const db2 = new MyDatabase()

    assert.equal(db1, db2)
  })

  // now we want to test that the SingletonRecordFinder works correctly. Tipically a unit test is a test which just verifies the operation of a single unit of code, in this case, a class, but since that class has the dependency of MyDatabase, we'll, end up having to test multiple classes at the same time

  // so the 2nd test will ensure that the SingletonRecordFinder calculates the population correctly

  test('calculates total population', function () {
    // so first we make an instance of the class
    let rf = new SingletonRecordFinder();

    // now the question is what data to use to test this code? at the moment, we have a hard dependency on the real database (SingletonRecordFinder calls MyDatabase which works with the real database), we cannot bring in any kind of dummy data

    let cities = [ 'Seoul', 'Mexico City' ]
    let tp = rf.totalPopulation(cities)
    assert.equal(tp, 17500000 + 17400000)

    // the test passes, but the problem is that it depends on a live database, if someone changes the population of one of the cities, then the test is broken

    // the other problem is that his is not an unit test, it's an integration test, because not only does it test the SingletonRecordFinder, but, due to the dependency, also tests the database with all its live data, which is never meant to be used in a real test

    //======================
    // this highlights the major problem with the Singleton because we are using the Singleton in SingletonRecordFinder explicitely (line 46), which means we cannot simply switch from the real database to a dummy database
    //======================

    // according to the "Dependency inversion principle", high level modules should not depend on low level modules, which is exactly what's happenning here

  })
})

// we can fix this really easily by specifying, in the constructor of SingletonRecordFinder, the database that it should depend on. But instead, let's build a ConfigurableRecordFinder

class ConfigurableRecordFinder {
  constructor(database) {
    this.database = database
  }

  totalPopulation(cities) {
    return cities
      .map(city => this.database.getPopulation(city))
      .reduce((x, y) => x + y)
  }
}

// and now we can also build a better test, the question now is, if not the live database, then what kind of data should we be using? We can make a dummy database, which is going to act just like the real database, except its data is going to be predictable, meaning that we'll know exactly what capitals and populations it will have, they will never change because we control them

class DummyDatabase {
  constructor() {
    this.capitals = {
      'alpha': 1,
      'beta': 2,
      'gamma': 3,
    }
  }

  getPopulation(city) {
    return this.capitals[city];
  }
}

// now the test would be like so
test('calculates total population better', function () { 
  let db = new DummyDatabase();
  let rf = new ConfigurableRecordFinder(db)

  assert.equal(rf.totalPopulation(['alpha', 'gamma']), 4)
})