# Builder

When piecewise object construction is complicated, provide an API for doing it succinctly

## Motivation

- Some objects are simple and can be created in a single initializer call
- Other objects require a lot of ceremony to create
- Having an object with 10 initializer arguments is not productive
- Instead, opt for a piecewise construction
- **Builder provides an API for constructing and object step-by-step**
