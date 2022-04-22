# Builder

When piecewise object construction is complicated, provide an API for doing it succinctly

## Motivation

- Some objects are simple and can be created in a single initializer call
- Other objects require a lot of ceremony to create
- Having an object with 10 initializer arguments is not productive
- Instead, opt for a piecewise construction
- **Builder provides an API for constructing and object step-by-step**

## Summary

- A builder is a separate component for building an object
- Can either give builder an initializer or return it via a static function
- To make a builder fluent, return self (this)
- Different facets of an object can be built with different builders working in tandem via a base class
