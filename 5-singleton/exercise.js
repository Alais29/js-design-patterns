/*
Write a function called isSingleton() . This method takes a factory (i.e., a function that returns an object);  it's up to you to determine whether or not that object is a singleton instance or not.
*/
const test = require('node:test')
const assert = require('node:assert/strict');

class SingletonTester
{
  static isSingleton(generator)
  {
    // todo
    const g1 = generator()
    const g2 = generator()

    return g1 === g2
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