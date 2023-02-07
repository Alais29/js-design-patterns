/*
======
TLDR
======
A decorator is a wrapper around some underlying class, which gives it additional functionality without modifying any elements of the hierarchy. It's just some extra information of behavior
*/

// The decorator is something you use to add additional functionality to a class. Let's suppose we have a base class called Shape, and imagine it keeps things common to differente geometric shapes

class Shape { }

//then we'll have some classes inheriting from this base class, for example Circle

class Circle extends Shape {
  constructor(radius = 0) {
    super();
    this.radius = radius
  }

  resize(factor) {
    this.radius *= factor;
  }

  toString() {
    return `A circle of radius ${this.radius}`;
  }
}

// Let's suppose we're working with the circle in our application, but then you decide that you want to be able to add color to particular shapes; so how do we do that? 

// A very intrusive way is to go into the base class Shape and add a constructor which also takes a color and assigns it, but then how do we access that color inside the Circle class toString method? we would also have to modify the Circle class and basically end up modifying the entire inheritance hierarchy

// the other way is by building a decorator, which is a class that wraps the original class and adds additional information or functionality. So we create the ColoredShape class

class ColoredShape extends Shape {
  constructor(shape, color) {
    super()
    this.shape = shape
    this.color = color
  }

  toString() {
    return `${this.shape.toString()} has the color ${this.color}`
  }
}

// now the implementation would work as follows, first we create a circle for example
let circle = new Circle(2)
console.log(circle.toString()) // A circle of radius 2

// then we use the decorator:
let redCircle = new ColoredShape(circle, 'red')
console.log(redCircle.toString()) // A circle of radius 2 has the color red

//============================
// you can also compose decorator, meaning wrap a decorator around other decorator; the decorator goes around the base class (Shape) but every decorator happens to extend that same base class (Shape)
//============================

// for example let's say we also want to add a transparency to a shape, we create the class
class TransparentShape extends Shape {
  constructor(shape, transparency) {
    super()
    this.shape = shape
    this.transparency = transparency
  }

  toString() {
    return `${this.shape.toString()} has ${this.transparency * 100}% transparency`
  }
}

// then we can apply it to the colored shape decorator and have a twice decorated object
let redHalveCircle = new TransparentShape(redCircle, 0.5)
console.log(redHalveCircle.toString()) // A circle of radius 2 has the color red has 50% transparency

//============================
// There are some things to watch out for in this implementation since it's in no way perfect:
// 1. Every single decorator actually loses the ability to call the underlying methods of the decorating shape directly, meaning that for example 'redCircle' is actually not a Circle (since a ColoredShape extends Shape, not Circle), so we wouldn't be able to call something like 'redCircle.resize()'; ALTHOUGH we can call the 'resize' method through the underlying shape as such 'redCircle.shape.resize()

// 2. At the moment there's nothing preventing us from applying the same decorator more than once, we could for example take the "redCircle", wrap it in a ColoredShape specifying 'blue' as the color and when printing it out it will say it's a circle of color red and color blue. 
// We could try to catch this by looking at the constructor, so whenever somebody is constructing the coloredShape we can check that the constructor type isn't the class you're working with.
// But then, what if somebody makes a ColoredShape of a TransparentShape of a ColoredShape, they could still apply the colored decorator twice
// It's possible to make an array that actually keeps all of the differente decorated types inside to know what kind of decorators have been applied, but it'd be too much work and probably not worth the effort, in the sense that you're not really breaking things significantly by allowing the same decorator to be applied more than once, although that really depends on the scenario