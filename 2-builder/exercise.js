// you are asked to implement the Builder design pattern for rendering simple chunks of code.
// Sample use of the builder you are asked to create:

/*
let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());
*/

// The expected output of the above code is:
/*
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
*/

class CodeBuilder {
  constructor(className) {
    // todo
    this.className = className;
    this.fields = [];
  }

  addField(name) {
    // todo
    // reminder: we want a fluent interface
    this.fields.push(name);
    return this;
  }

  toString() {
    // todo
    let code = [];
    code.push(`class ${this.className} {\n`);
    if (this.fields.length > 0) {
      code.push(`  constructor(${this.fields.join(", ")}) {\n`);
      for (let field of this.fields) {
        code.push(`    this.${field} = ${field};\n`);
      }
      code.push("  }\n");
    }
    code.push("}");
    return code.join("");
  }
}

let cb = new CodeBuilder("Person");
cb.addField("name").addField("age");
console.log(cb.toString());
