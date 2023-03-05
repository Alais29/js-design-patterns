/*
======
TLDR
======
The proxy masquerades as if it were an ordinary value, with setter and getter, but it does additional things inside the setter, and it could also do additional things inside the getter as well
*/

// The idea of a property proxy is that instead of using a property like expected, like mapping onto a field, you map it onto an instance of a class, while the user is oblivious to this

// let's imagine you have some sort of computer game, you have creatures walking around, and those creatures have certain stats that you can modify. The idea is that as you construct your creature, you have certain properties like str, agi, etc., but instead of having them as ordinary properties in the constructor, you expose the getters and setters, but they all map onto something else that behaves as an ordinary value but also does other things besides just set and get values 

// so let's first have a class called property which will have a constructor where you can specify the initial value, but also give the property a name explicitely as a string, the reason for this is that the name can be used for logging for example.
class Property {
  constructor(value, name = '') {
    this._value = value;
    this.name = name;
  }

  // now we'll also provide the getters and setters for the property, nothing different with the getter
  get value() { return this._value }
  
  // but the setter will be different
  set value(newValue) {
    // let's suppose that in the setter I want to make sure that the property has in fact changed, and if so I want to log this
    if (this._value === newValue) return
    console.log(`Assigning ${newValue} to ${this.name}`)
    this._value = newValue 
  }
}

// now we can use this property class inside a Creature Class to actually specify certain properties
class Creature {
  constructor() {
    // we use the _ because this is not something that is meant to be touched directly
    this._agility = new Property(10, 'agility')
  }

  // now we provide the getters and setters
  get agility() { return this._agility.value }
  set agility(value) {
    // remember that when you perform this assignment, the value setter of the Property class is being executed, so we end up doing the logging, and we you build the creature with other properties, such as strength, intelligence, etc., you will automatically get the loggin functionality as long as you use the Property class to initialize the property
    this._agility.value = value
  }
}

let creature = new Creature()
creature.agility = 12 // Assigning 12 to agility
creature.agility = 13 // Assigning 13 to agility
creature.agility = 13 // nothing gets logged because the new value is equal to the previous value