// The idea of an abstract factory is a bit more complicated, the idea is that you can have a hierarchy of objects and you can have a related hierarchy of types and then you can group the factory and for example expose them as some sort of list

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

class HotDrinkMachine {
  makeDrink(type) {
    switch (type) {
      case "tea":
        return new TeaFactory().prepare(200);
      case "coffee":
        return new CoffeFactory().prepare(50);
      default:
        throw new Error("You can only choose between tea and coffee.");
    }
  }
}
