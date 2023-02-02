// Consider the code presented below. We have two classes called SingleValue and ManyValues. SingleValue stores just one numeric value (initialized in the constructor), but ManyValues can store either numeric values or SingleValue objects (assume it implements a push() method for adding items).

// You are asked to write a function called sum that takes an array of items (any item can be either SingleValue or ManyValues).

// Here is a sample Jasminea unit test:
// describe('composite', function()
// {
//   it('should sum up different objects', function()
//   {
//     let singleValue = new SingleValue(11);
//     let otherValues = new ManyValues();
//     otherValues.push(22);
//     otherValues.push(33);
//     expect(sum([singleValue, otherValues])).toEqual(66);
//   });
// });

class SingleValue
{
  constructor(value)
  {
    // todo
    this.value = value;
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this.value,
        done: returned++
      })
    }
  }
}

class ManyValues extends Array
{
  // ensure there's a push(value) method
  constructor() {
    super()
  }
}

let sum = function(containers)
{
  // todo
  let result = 0
  for (let container of containers)
    for (let value of container) 
      result += value
  
  return result
};

let singleValue = new SingleValue(11);
let otherValues = new ManyValues();
otherValues.push(22);
otherValues.push(33);

console.log(sum([singleValue, otherValues]))

