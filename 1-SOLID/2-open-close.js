/*
=======
The open-close principle states that objects are open for extension but closed for modification. 

You never jump into an existing class and start modifying it (unless you absolutely have to because there's a bug, for example)
=======
*/

let Color = Object.freeze({
  red: "red",
  green: "green",
  blue: "blue",
});

let Size = Object.freeze({
  small: "small",
  medium: "medium",
  large: "large",
});

//Let's imagine we sell products, so we create a Product class
class Product {
  constructor(name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// Then let's say we need to filter by color, so we create a ProductFilter class and add the filterByColor method to it
class ProductFilter {
  filterByColor(products, color) {
    return products.filter((p) => p.color === color);
  }

  // Then let's say now we want to filter by size, this is doable, we would just need to add a filter size method to the class right?
  filterBySize(products, size) {
    return products.filter((p) => p.size === size);
  }

  // but as soon as we start adding additional methods to this ProductFilter class, this is a modification so we're breaking the principle, we're modifying a class that might have already been tested and deployed somewhere

  // Imagine now we want to filter both by size and by color, we would need to add yet another method here, this might not be a problem right now but if the application scales and gets bigger, we'll have a "state space explosion" meaning that this entire approach doesn't work to infinity, imagine we had 3 criteria to filter (instead of just size and color) and we want to filter by all combinations of them, that's gonna be 7 different methods
}

//This is where the Specification Pattern comes in, whenever we want to have a prticular filtering criteria we specify a separate class that defines that sort of filtering, and that class is called:

// Specification
class ColorSpecification {
  constructor(color) {
    this.color = color;
  }

  isSatisfied(item) {
    return item.color === this.color;
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size;
  }

  isSatisfied(item) {
    return item.size === this.size;
  }
}

// This may seem as an overkill for this situation, BUT the result is now every filter is untied from the other, so if we need a new specification we don't modify the existing ones, we just make a new class which also has a constructor that takes some criteria and crucially it has an isSatisfied method (Continue on Line 80)

let apple = new Product("Apple", Color.green, Size.small);
let tree = new Product("Tree", Color.green, Size.large);
let house = new Product("House", Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log(`Green products (old):`);
for (let p of pf.filterByColor(products, Color.green)) {
  console.log(` * ${p.name} is green`);
}

// The isSatisfied method of each class is used in a better filter based on specifications
class BetterFilter {
  filter(items, specification) {
    return items.filter((x) => specification.isSatisfied(x));
  }
}

// Now what if we want to filter by size AND/OR color? We need to create a Combinator, which is an specification that combines other specifications
class AndSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.every((x) => x.isSatisfied(item));
  }
}

class OrSpecification {
  constructor(...specs) {
    this.specs = specs;
  }

  isSatisfied(item) {
    return this.specs.some((x) => x.isSatisfied(item));
  }
}

let bf = new BetterFilter();
console.log(`Green products (new):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green))) {
  console.log(` * ${p.name} is Green`);
}

console.log(`Large and green products:`);
let spec = new AndSpecification(
  new ColorSpecification(Color.green),
  new SizeSpecification(Size.large)
);
for (let p of bf.filter(products, spec)) {
  console.log(` * ${p.name} is large and green`);
}

console.log(`Small or green products:`);
let specOr = new OrSpecification(
  new ColorSpecification(Color.blue),
  new SizeSpecification(Size.small)
);
for (let p of bf.filter(products, specOr)) {
  console.log(` * ${p.name} is small or blue`);
}
