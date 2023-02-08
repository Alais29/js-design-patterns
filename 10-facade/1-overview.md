# Facade
Provides a simple, easy to understand, user interface over a large and sophisticated body of code

## Motivation
- Balancing complexity and presentation/usability
- Example: A typical home
  - Has many subsystems (electrical, sanitation, etc)
  - Has a Complex internal structure (e.g., floor layers)
  - But the end user is not exposed to internals
- The same goes with software! sometimes you get lots of different systems working together to provide absolute flexibility but you want a nice API for consumers

## Summary
- Build a facade to provide a simplified API over a set of classes
- May wish to (optionally) expose internals through the facade
- May allow users to 'escalate' to use more complex APIs if they need to