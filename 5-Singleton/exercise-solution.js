const test = require('node:test')
const assert = require('node:assert/strict');

class SingletonTester
{
  static isSingleton(generator)
  {
    let obj1 = generator();
    let obj2 = generator();
    console.log(obj1.toString());
    console.log(obj2.toString());
    console.log(`Returning ${obj1 === obj2}`);
    return obj1 === obj2;
  }
}

test('singleton', function()
{
  test('test with a real singleton', function() {
    const item = [1, 2, 3];
    assert.equal(SingletonTester.isSingleton(() => item), true)
  });

  test('test with a non-singleton', function() {
    let result = SingletonTester.isSingleton(
      () => [ Math.random() ]
    );
    assert.equal(result, false)
  });
});