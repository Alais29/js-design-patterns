/*
======
TLDR
======
This is probably the simplest implementation of the composite design patter. The idea here is that you can have an object (GraphicObject) which masquerades as both a singular element and a collection of elements.
*/

// let's discuss the idea of grouping geometric shapes together. If we think of a drawing application, we can drag around and resize individual shapes but you can also group several shapes together and then perform common operations on them. LEt's try to emulate this scenario

// this class will be both a single object is it's used as a base class as well as a collection of objects if it's used by itself

class GraphicObject {
  // if no name is passed we'll call the object Group and we'll have them numbered, so we'll have a variable called count which will be incremented each time a new group is created
  constructor(name= 'Group ' + (GraphicObject.count++)) {
    this._name = name;
    this.color = undefined;
    // we have a set of children because this graphic object can act either as a group, in which case it has a number of other graphic objects inside it, or it can ac as a standalone object
    this.children = [];
  }

  get name() {
    return this._name
  }

  // we want to be able to print this object, including all of its children
  print(buffer, depth) {
    buffer.push('*'.repeat(depth));
    if (depth > 0) buffer.push(' ');
    if (this.color) buffer.push(this.color + ' ');
    buffer.push(this.name);
    buffer.push('\n');

    for (let child of this.children)
      child.print(buffer, depth+1);
  }

  toString() {
    let buffer = [];
    this.print(buffer, 0);
    return buffer.join('');
  }
}
GraphicObject.count = 0

class Circle extends GraphicObject {
  constructor(color) {
    super('Circle')
    this.color = color
  }
}

class Square extends GraphicObject {
  constructor(color) {
    super('Square')
    this.color = color
  }
}

// we can now construct an object which consists of several other graphic objects
let drawing = new GraphicObject();
drawing.children.push(new Square('Red'))
drawing.children.push(new Circle('Yellow'))

// now we can make a group which is a new graphic object that's going to be group 1
let group = new GraphicObject()
group.children.push(new Circle('Blue'))
group.children.push(new Square('Blue'))

// and then I can take the group and add it as another element of the drawing 
drawing.children.push(group);

// so you can have groups of groups to infinity, there's no limit. and essentially what's happening is that circles and squares and entire graphic objects get treated in an uniform manner, in the sense that when tou call to string, wether it's a singular object or a collection of different objects, it doesn't matter, it's always going to get printed correctly.

console.log(drawing.toString())
/*
Output:
Group 0
* Red Square
* Yellow Circle
* Group 1
** Blue Circle
** Blue Square
*/