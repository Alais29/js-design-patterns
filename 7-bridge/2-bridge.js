/*
======
TLDR
======
The Bridge design pattern is just a way of connecting two hierarchies of objects together, in this case Shapes and Renderers. One of the hierarchies uses another, and you have to expand the hierarchy you depend on (in this case the Renderer)
*/

// Let's imagine that you have a class called shape which describes any sort of geometric shape
// class Shape { }

// from that you can have several differente inheritors
// class Circle { }
// class Square { } 

// Also imagine that you have different ways of rendering circles and squares, using pixels (raster rendering) or using a vector format (vector render)

// class VectorRenderer { }
// class RasterRenderer { }

// . If you try to implement a class hierarchy for all of this, you end up with too many data types: VectorCircle, VectorSquare, RasterCircle, RasterSquare.

// So what you need to do is build a "bridge" between the 2 hierarchies, which are:
// - Shapes (Square, Circle, Triangle, ...)
// - Renderers (Vector, Raster, SVG, ...)

// One way could be to put the renderer into the shape, and from there we could actually render the different shapes

class Shape {
  constructor(renderer) {
    this.renderer = renderer
  }
}

// now, this is actually how it would be implemented, each of the shape hierarchy classes would extend the class Shape, and of course its constructur would also include something specific of the shape you wish to work with like the radius for the Circle for example.

class Circle extends Shape {
  constructor(renderer, radius) {
    super(renderer)
    this.radius = radius
  }

  // now the shape needs to implement a method called draw to render itself by using the renderer that it's provided
  draw() {
    // renderCircle hasn't been implemented yet, we need to create it inside the renderer itself (line 49)
    this.renderer.renderCircle(this.radius)
  }

  // let's also add a method for resizing the circle
  resize(factor) {
    this.radius *= factor
  }
}

// now, we don't know which renderer is going to render the circle so we need to implement the method in both of them
class VectorRenderer { 
  renderCircle(radius) {
    console.log(`Drawing a circle of radius ${radius}`)
  }
}

class RasterRenderer { 
  renderCircle(radius) {
    console.log(`Drawing pixels for a circle of radius ${radius}`)
  }
}

// now, how would all of this work? first, you make the renderer you want to use
let raster = new RasterRenderer()
let vector = new VectorRenderer()

// then we pass it to the shape
let circle = new Circle(vector, 5)
let circle2 = new Circle(raster, 5)

// and then we draw the shape, which will render it with the renderer we passed as an argument when creating the shape
circle.draw(); // Drawing a circle of radius 5
circle.resize(2); 
circle.draw(); // Drawing a circle of radius 10

circle2.draw(); // Drawing pixels for a circle of radius 5
circle2.resize(2); 
circle2.draw(); // Drawing pixels for a circle of radius 10

// This implementation of course, only gets away from the idea of the complexity explosion to a certain degree, since if for example we need a new implementation of rendering for a square then the number of new methods you need to add is equal to the number of renderers (for example, we'd have to write the methods renderSquare inside the VectorRenderer and RasterRenderer classes). This does gets us away from having too many classes but it does not get us away from having too many methods.