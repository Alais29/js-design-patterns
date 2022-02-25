class Field {
  constructor(name) {
    this.name = name;
  }
}

class Class {
  constructor(name) {
    this.name = name;
    this.fields = [];
  }

  toString() {
    let buffer = [];
    buffer.push(`class ${this.name} {\n`);

    if (this.fields.length > 0) {
      buffer.push(`  constructor(`);
      for (let i = 0; i < this.fields.length; ++i) {
        buffer.push(this.fields[i].name);
        if (i + 1 !== this.fields.length) buffer.push(", ");
      }
      buffer.push(`) {\n`);
      for (let field of this.fields) {
        buffer.push(`    this.${field.name} = ${field.name};\n`);
      }
      buffer.push("  }\n");
    }

    buffer.push("}");
    return buffer.join("");
  }
}

class CodeBuilder {
  constructor(className) {
    this._class = new Class(className);
  }

  addField(name) {
    this._class.fields.push(new Field(name));
    return this;
  }

  toString() {
    return this._class.toString();
  }
}
