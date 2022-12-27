// A builder is something that helps you construct a particular object

// We're building up a chunk of HTML as an example. Let's suppose you want a single paragraph and you want it to contain some word

// If we just started writing JS, it would be rather verbose, for example:
const hello = "hello";
let html = [];
html.push("<p>");
html.push(hello);
html.push("</p>");

console.log(html.join(""));

// although this might be an overkill since we could just use string interpolation. However, it gets interesting when you have something more complicated than a paragraph, like a list of words for example:

const words = ["hello", "world"];
html = [];
html.push("<ul>\n");
for (let word of words) {
  html.push(`  <li>${word}</li>\n`);
}
html.push("</ul>");

console.log(html.join(""));

// As things get more and more complicated we're going to be writing more and more of these html.push, in a large enough scenario, having this kind of string manipulation is not realistic, so let's adopt a more structured approach as to how to output HTML

class Tag {
  static get indentSize() {
    return 2;
  }

  constructor(name = "", text = "") {
    this.name = name;
    this.text = text;
    this.children = [];
  }

  toStringImpl(indent) {
    let html = [];
    let i = " ".repeat(indent * Tag.indentSize);
    html.push(`${i}<${this.name}>\n`);
    if (this.text.length > 0) {
      html.push(" ".repeat(Tag.indentSize * (indent + 1)));
      html.push(this.text);
      html.push("\n");
    }

    for (let child of this.children) html.push(child.toStringImpl(indent + 1));

    html.push(`${i}</${this.name}>\n`);
    return html.join("");
  }

  toString() {
    return this.toStringImpl(0);
  }

  static create(name) {
    return new HtmlBuilder(name);
  }
}

// Now we can start using this Tag, but in order to make it easier to use, we're actually going to make a builder, and this takes us to the core of the Builder Design Pattern. The Builder is a separate component that helps you build tags on top of tags

class HtmlBuilder {
  // the rootName is the name of the root element, if you're building an entire web page, the root element would probably be html, if you're building just a table, the root element would be table and so on
  constructor(rootName) {
    this.root = new Tag(rootName);
    this.rootName = rootName;
  }

  addChild(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
  }

  addChildFluent(childName, childText) {
    let child = new Tag(childName, childText);
    this.root.children.push(child);
    return this;
  }

  toString() {
    return this.root.toString();
  }

  clear() {
    this.root = new Tag(this.rootName);
  }

  build() {
    return this.root;
  }
}

let builder = new HtmlBuilder("ul");
for (let word of words) {
  builder.addChild("li", word);
}
console.log(builder.build().toString());

// There's a couple of ways we can customize the entire process, for example, how do we indicate to the user that they shouldn't work with the class Tag directly. One way can be creating some sort of static method to return the builder (line 59), this gives us a different way of actually working with the builder, this way, instead of initializing it directly, we do it through the object it actually intends to build

// however this introduces coupling, we now have this bidirectional dependency between the builder and the object that builds it up so it's a slight violation of the open-close principle because if you imagine another builder being constructed, then you might want to go back an make another create method that does something else

// this is how you'd use it though:
// let builder = Tag.create('ul')

// Another thing we can add is a fluent interface, it allows us to chain calls on builders, first we're going to add a clear method to clear the builder (line 88) and we'll add a new method called addChildFluent (line 78) that returns a reference to the containing object, we want this because this way we can use the builder to add several children to the list in a single statement:

builder.clear();
builder
  .addChildFluent("li", "foo")
  .addChildFluent("li", "bar")
  .addChildFluent("li", "baz");

console.log(builder.toString());
