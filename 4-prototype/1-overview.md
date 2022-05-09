# Prototype

A partially or fully initialized object that you copy (clone) and make use of.

## Motivation

- Complicated objects (e.g., cars) aren't designed from scratch
  - They reiterate existing designs
- An existing (partially or fully constructed) design is a Prototype
- We make a copy (clone) of the prototype and customize it
  - Requires a 'deep copy' support
- We make the cloning convenient (e.g., via a Factory)

## Summary

- To implement a prototype, partially construct an object (or you can have a fully initialized object) and store it somewhere
- Deep copy the prototype whenever somebody wants to get an instance of it
- Allow the user to customize the resulting instance
- A factory provides a convenient API for using prototypes
