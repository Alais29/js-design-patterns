// The idea of an abstract factory is a bit more complicated, the idea is that you can have a hierarchy of objects and you can have a related hierarchy of types and then you can group the factory and for example expose them as some sort of list

/*
========
TL;DR
========
Sometimes you end up with situations where you have a hierarchy of types (in this case we have a HotDrink hierarchy which is made up with drink and coffee) and you have a corresponding hierarchy of the factories which actually instantiate those types (HotDrinkFactory and different ways of making tea and coffee) and what you can do is find different ways of putting them into a one to one correspondance with whatever construct necessary (list, tables, etc) to make the connection, and then you can invoke them in a very general way (see HotDrinkMachine constructor)
*/

const readline = require("readline");
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class HotDrink {
  consume() {
    // abstract
  }
}

class Tea extends HotDrink {
  consume() {
    console.log(`This tea is nice with lemon!`);
  }
}

class Coffee extends HotDrink {
  consume() {
    console.log(`This coffee is delicious!`);
  }
}

// Tea and Coffe here form a hierarchy, they're both of type HotDrink. In addition to this hierarchy of drinks we're going to have a hierarchy of factories which are used to manufacture those drinks

class HotDrinkFactory {
  prepare(amount) {
    // abstract
  }
}

class TeaFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Put in thea bag, boil water, pour ${amount}ml`);
    return new Tea(); // Tipically here we would customize the tea
  }
}

class CoffeFactory extends HotDrinkFactory {
  prepare(amount) {
    console.log(`Grind some beans, boil water, pour ${amount}ml`);
    return new Coffee(); // Tipically here we would customize the coffee
  }
}

// class HotDrinkMachine {
//   makeDrink(type) {
//     switch (type) {
//       case "tea":
//         return new TeaFactory().prepare(200);
//       case "coffee":
//         return new CoffeFactory().prepare(50);
//       default:
//         throw new Error("You can only choose between tea and coffee.");
//     }
//   }
// }

// this is how we would use the factory explicitely but what we really want is to have some sort of association between the factory (TeaFactory or CoffeFactory) and the object that the factory makes (Coffea or Tea), at this point the association is done by hand (with a switch case)

// let machine = new HotDrinkMachine();

// rl.question("Which drink? ", function (answer) {
//   let drink = machine.makeDrink(answer);
//   drink.consume();

//   rl.close();
// });

// so we can create an enumeration like this:

let AvailableDrink = Object.freeze({
  coffee: CoffeFactory,
  tea: TeaFactory,
});

// and now in the constructor of the HotDrinkMachine we can instantiate every single factory that's available, so it would now look like this:

class HotDrinkMachine {
  constructor() {
    this.factories = {};
    for (let drink in AvailableDrink) {
      this.factories[drink] = new AvailableDrink[drink]();
    }
  }

  // and we could have a kind of interactive experience for the user like such:
  interact(consumer) {
    rl.question(
      "Please specify drink and amount " + "(e.g., tea 50):",
      (answer) => {
        let parts = answer.split(" ");
        let name = parts[0];
        let amount = parseInt(parts[1]);
        let drink = this.factories[name].prepare(amount);
        rl.close();
        consumer(drink);
      }
    );
  }
}

let machine = new HotDrinkMachine();
machine.interact(function (drink) {
  drink.consume();
});
