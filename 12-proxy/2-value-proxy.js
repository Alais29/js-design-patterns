// A value proxy is the simplest type of proxy to build because it's a proxy of a simple value type (integer, float, etc)

// Why would you want to have a proxy over a number? because sometimes the number doesnt behave just as an ordinary number, a typical example is a percentage

// A percentage is like an ordinary value, with the difference that when you multiply by the percentage, you're not multiplying by the percentage value

// In this example we want to have a way of defining a percentage as a value type and be able to multiply some value by that percentage and get the percentage of that value

// first we have a percentage class
class Percentage {
  constructor(percent) {
    this.percent = percent; // 0-100
  }

  toString() {
    return `${this.percent}%`
  }

  // now, we create a valueOf method to override the default JS valueOf method for this class, which will return the actual value by which we need to multiply to get the percentage of a value
  valueOf() {
    return this.percent / 100
  }
}

let fivePercent = new Percentage(5);
console.log(fivePercent.toString())
console.log(`5% of 50 is ${50*fivePercent}}`)