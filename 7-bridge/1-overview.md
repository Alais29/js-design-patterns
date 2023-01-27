# Bridge
Connecting componentes together through abstractions. A mechanism that decouples an interface (hierarchy) from an implementation (hierarchy).

Reminder: JS has duck typing, so definitions of interfaces are not strictly necessary.

## Motivation
- Bridge prevents a 'Cartesian product' complexity explosion
  - Example:
    - Base class ThreadScheduler
    - Different types: Preemptive or Cooperative
    - Can run on Windows or Unix
    - If we only do one class per implementation you end up with a 2x2 scenario: WindowsPTS, UnixPTS, WindowsCTS, UnixCTS
    - The situation doesn't really scale 
- Bridge pattern avoids the entity explosion in the number of entities

## Summary
- Decouple abstraction from implementation (split up one abstracion and get it to depend on another)
- Both can exist as hierarchies
- A stronger form of encapsulation (not only do you encapsulate within a particular class, you also take some of the functionality outside and put it into a separate hierarchy)