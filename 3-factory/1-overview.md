# Factory

A component responsible solely for the wholesale (not piecewise) creation of objects

## Motivation

- Object creation logic becomes too convoluted
- Initializer is not descriptive
  - Name is always **init**
  - Cannot overload with same sets of arguments with different names
  - Can turn into 'optional parameter hell'
- Wholesale object creation (non-piecewise, unlike Builder) can be outsourced to
  - A separate method (Factory Method)
  - That may exist in a separate class (Factory)
  - Can create hierarchy of factories with Abstract Factory

## Summary

- A factory method is a static method that creates objects
- A factory is any entity that can take care of object creation. We usually talk about it being a class, but that's not always the case, for example if you have a method that takes a lambda that creates objects then you have a factory wrapped as a little anonymous function
- A factory can be external or reside inside the object as an inner class
- Hierarchies of factories can be used to create related objects
