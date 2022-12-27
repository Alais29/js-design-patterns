# Singleton

A component which is inatantiated only once, and a singleton design pattern is an implementation that tries to prevent you from instantiating that component more than once

## Motivation

- For some components it only makes sense to have one instance of them in the system at any given time, for example:
  - Database repository
  - Object factory
- The constructor call might be expensive
  - We want initialization to only happen once
  - We provide everyone with the same instance
- We want to prevent anyone from creating additional copies

## Summary
- A constructor can choose what to return; we can keep returning the same instance
- Monostate: many instances, shared data. *A rather bizarre kind of implementation, NOT RECOMMENDED TO USE, DANGEROUS FOR SEVERAL REASONS, SHOWN ONLY FOR ACADEMIC CURIOSITY.*
- Directly depending on the Singleton is a bad idea; introduce a dependency that can be substituted instead (for example, in the constructor of the component that uses the Singleton)