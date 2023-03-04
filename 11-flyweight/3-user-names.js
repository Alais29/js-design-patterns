/*
======
TLDR
======
Sometimes, it's worth caching the data into some sort of common storage, and instead of storing that data and allowing for duplication, we store indexes
*/


// Imagine you have a backend server where you have to store lots of different people's names, when you have a few people participating, you're going to have lots of duplication 

// let's say we have a class called User
class User {
  // for the sake of demonstration, we'll only have the full name of the user
  constructor(fullName) {
    // the most obvious solution would be to store it like this

    this.fullName = fullName

    // this is ok if you don't have many users, otherwise you'll have lots of duplication, imagine you have an user called Adam Smith, there'll probably be lots of users called like that, and if you store it like said previously, for every single user with that name, you're going to be creating a new string, which will waste memory, you'll also have lots of users with the same last name but not the same name or vice versa

    // there's a potential for saving lots of memory here 
  }
}

// let's do a very unscientific experiment where we try to measure how much memory we're going to ocupy, let's create 10000 users, for that we'll use some utility functions:

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let randomString = function () {
  let result = [];
  for (let x = 0; x< 10; ++x) {
    result.push(String.fromCharCode(65 + getRandomInt(26)));
  }
}

// and now let's create a bunch of first names and last names
let firstNames = []
let lastNames = []
let users = []

for (let i = 0; i < 100; ++i) {
  firstNames.push(randomString());
  lastNames.push(randomString());
}

for (let first of firstNames) {
  for (let last of lastNames) {
    users.push(new User(`${first} ${last}`))
  }
}

// in order to measure the amount of memory that's occupied, we'll do a ver unscientific thing, we'll serialize everything intoJson and then measure the length of the resulting string, obviously that's not the correct way of measuring things, since we'll have the name of every field repeating over and over, which will take more memory than the strings themselves, but since we'll be adding it to both scenarios, let's just forget about that in this case

console.log(`10k users take up approximately ${JSON.stringify(users).length} chars`) // 10k users take up approximately 350001 chars

// now, let's try to optimize this situation. The idea of the flyweight design pattern is that instead of storing the full data over and over again, you prevent as much of the duplication as possible

// so lets build a new class called User2 

class User2 {
  constructor(fullName) {
    // what we'll do is give every User2 instance a common storage for the strings (see User2.strings below) which will store every single unique string and when we get a fullName we're going to break it apart into first and last and then we're going to look wether or not each of the elements is inside our strings storage, if it is we'll get the index from there, if not we'll add it as a new element.
    const getOrAdd = (s) => {
      let idx = User2.strings.indexOf(s)
      if (idx !== -1) return idx
      else {
        User2.strings.push(s);
        return User2.strings.length - 1
      }
    } 
    this.names = fullName.split(' ').map(getOrAdd)
    // so in the end this.names becomes an array of integers which is precisely what the flyweight pattern is all about, instead of having all the strings duplicated, we have a bunch of integers which are references to where the string we need is 
  }
}
User2.strings = []

// now let's check again how much memory this actually takes up 
let users2 = []
for (let first of firstNames) {
  for (let last of lastNames) {
    users2.push(new User2(`${first} ${last}`))
  }
}

// this time we need to serialize 2 things, the users2 array and all the strings data from User2, so we'll get each one's length and add them together
let users2length = [users2, User2.strings].map(x => JSON.stringify(x).length).reduce((x,y) => x + y)

console.log(`10k flyweight users take up approximately ${users2length} chars`) // 10k flyweight users take up approximately 160014 chars