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
