# Composite
Facilitates the addition of behaviors to individual objects without inheriting from them.

## Motivation
- Want to augment an object (class) with additional functionality
- Do not want to rewrite or alter existing code (Open-Close Principle)
- Want to keep new functionality separate (Single Responsability Principle)
- Need to be able to interact with existing structures
- Two options:
  - Inherit from required object (if possible)
  - Build a Decorator, which simply references the decorated object(s)

## Summary
- A decorator keeps the reference to the decorated object(s)
- Adds utility fields and methods to augment the object's features
- May or may not forward calls to the underlying object