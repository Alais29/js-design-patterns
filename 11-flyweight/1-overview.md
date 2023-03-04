# Flyweight
A space optimization technique that lets us use less memory by storing externally the data associated with similar objects

## Motivation
- Avoid redundancy when storing data
- E.g., MMORPG
  - Plenty of users with identical first/last names
  - No sense in storing same first/last name over and over again because you would only be wasting memory
  - Store a list of names and reference to them
- E.g., bold or italic text formatting
  - You don't want each character to have a formatting character
  - Operate on ranges (e.g., line number, start/end positions)

## Summary
- Store common/repeating data externally
- Specify an index or a reference into the external data store
- Define the idea of 'ranges' on homogeneous collections and store data related to those ranges