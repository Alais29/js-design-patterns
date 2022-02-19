# Summary

### Single Responsability Principle

- A class should only have one reason to change
- Separation of concerns - differente classes handling differente, independent tasks/problems

### Open-closed principle

- Classes should be open for extension but closed for modification
- If you come back to already written, tested class, and modifying things to extend functionality, this is probably not the best way to do this, you should consider inheritance

### Liskov Substitution Principle

- You should be able to substitute a base type/class for a subtype/extended class

### Interface Segregation Principle

- Don't put too much into an interface; split into separate interfaces
- YAGNI - You Ain't Going to Need It. You're not going to need certain methods implemented so why force other people to implement the interface in the first place

### Dependency Inversion Principle

- High-level modules should not depende upon low-level ones; use abstractions
