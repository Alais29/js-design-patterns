/*
========
You have to segregate or split up interfaces into different parts so that people don't implement more that what they need.
========
*/

class Document {}

class Machine {
  constructor() {
    if (this.constructor.name === "Machine")
      throw new Error("Machine is abstract");
  }

  print(doc) {}
  fax(doc) {}
  scan(doc) {}
}

class MultifunctionalPrinter extends Machine {
  print(doc) {
    //
  }
  scan(doc) {
    //
  }
  fax(doc) {
    //
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    let msg = `${name} is not implemented`;
    super(msg);
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, NotImplementedError);
  }
}

class OldFashionPrinter extends Machine {
  print(doc) {
    // ok
  }
  scan(doc) {
    // do nothing
    // although this breaks another software development principle called "principle of least surprise", which states that when people use your API they should not be surprised, they should not see some magic behaviour or lack of behavoiour, you want them to have predictable results
    // we could instead throw an error
  }
  fax(doc) {
    throw new NotImplementedError("OldFashionedPrinter.scan");
  }
}

//  This implementation is not really fulfilling the interface segregation principle, if you want to formalize the contract for a printer then we could make an interface that only has the print method, so we may define the following:
class Printer {
  constructor() {
    if (this.constructor.name === "Machine")
      throw new Error("Machine is abstract");
  }

  print(doc) {}
}

// and now the OldFashionedPrinter could implement the Printer class instead of the Machine class, the same could be applied for a Scanner class or a Fax class

let printer = new OldFashionPrinter();
printer.scan();
