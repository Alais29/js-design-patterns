# Composite
A mechanism for treating individual objects and compositions of objects in an uniform manner

## Motivation
- Objects use other objects' fields/methods through inheritance and composition
- Composition lets us make compound objects
  - E.g., a mathematical expression (1 + 2 + 3) is composed of simple expressions;
  - A shape group made of several different shapes
- Composite design pattern is used to treat both single scalar and composite objects uniformly (they have the same interface)
  - I.e., a class Foo and an array (containing Foos) having the same API

## Summary
- Objects can use other objects via inheritance/composition
- Some composed and singular objects need similar/identical behaviors
- Composite design pattern lets us treat both types of objects uniformly
- JS supports iteration with Symbol.iterator
- A single object can make itself iterable by yielding *this*