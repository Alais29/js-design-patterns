// Let's suppose the mismatch in the APIs that you have is a mismatch between vector objects and raster objects. Let's suppose we have a very simple API for drawing a point

let drawPoint = function (point) {
  process.stdout.write('.');
}

// ↑↑↑ you have to work with this API 

// but let's suppose that in your project you don't have points anywhere, or maybe you do, but you don't use them directly, maybe you're working with lines, shapes, etc.

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return `(${this.x}, ${this.y})`
  }
}

// so if you have points like these, you can use them to define geometric shapes like lines, for example

class Line { 
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  toString() {
    return `${this.start.toString()} => ${this.end.toString()}`
  }
}

// let's suppose that everything that you're working with inside your application is made up of lines

class VectorObject extends Array { }
class VectorRectangle extends VectorObject {
  constructor(x, y, width, height) {
    super()
    this.push(new Line(new Point(x,y), new Point(x+width, y) ));
    this.push(new Line(new Point(x+width,y), new Point(x+width, y+height) ));
    this.push(new Line(new Point(x,y), new Point(x, y+height) ));
    this.push(new Line(new Point(x,y+height), new Point(x+width, y+height) ));
  }
}

// now we have a major problem, we don't have an API for drwaing rectangles, or even lines, we only have an API for drawing a single point (line 3)

// so can we actually draw those rectangles? 

// let's suppose we have a bunch of vector objects
let vectorObjects = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 6, 6),
]

// right now we can't draw the rectangles because we don't have any functions to do that, we can only draw a single point

// to be able to draw the rectangles using the API that you're given you need to build an adapter, something which transforms every single one of those vector objects, which are made out of lines, we need to transform every single line into a set of points. So we have to build a line to point adapter, and that's the adaptive design pattern in a nutshell.

class LineToPointAdapter extends Array {
  //it extends array because the idea is that you give the constructor a line and it turns this line into a set of points
  constructor(line) {
    super()
    console.log(`${LineToPointAdapter.count++}: Generating point for line ${line.toString()} (no caching)`)

    // we first grab the left, right, top and bottom locations of the line
    let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    // and for every one of them, we use a loop to generate a set of points
    if (right - left === 0) {
      for (let y = top; y <= bottom; ++y) {
        this.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        this.push(new Point(x, top));
      }
    }
  }
}
// we also want to keep a count of the number of points that are generated and the number of lines processed, this will be important for later on
LineToPointAdapter.count = 0

// then we can try and have some sort of function for actually drawing a bunch of objects
let drawPoints = function () {
  // for every vector object we get every one of their lines
  for (let vo of vectorObjects)
    // and for each line we create an adapter and pass the line as the argument
    for (let line of vo) {
      let adapter = new LineToPointAdapter(line);
      // then we take the adapter points, and for each one we call the drawpoint function (line 3)
      adapter.forEach(drawPoint);
    }
}

drawPoints()
/*
Output:
0: Generating point for line (1, 1) => (11, 1) (no caching)
...........1: Generating point for line (11, 1) => (11, 11) (no caching)
...........2: Generating point for line (1, 1) => (1, 11) (no caching)
...........3: Generating point for line (1, 11) => (11, 11) (no caching)
...........4: Generating point for line (3, 3) => (9, 3) (no caching)
.......5: Generating point for line (9, 3) => (9, 9) (no caching)
.......6: Generating point for line (3, 3) => (3, 9) (no caching)
.......7: Generating point for line (3, 9) => (9, 9) (no caching)
.......%  
*/

// this might look like a good implementation, but what if duplicate the drawPoints function call?
drawPoints()

/*
Output:
0: Generating point for line (1, 1) => (11, 1) (no caching)
...........1: Generating point for line (11, 1) => (11, 11) (no caching)
...........2: Generating point for line (1, 1) => (1, 11) (no caching)
...........3: Generating point for line (1, 11) => (11, 11) (no caching)
...........4: Generating point for line (3, 3) => (9, 3) (no caching)
.......5: Generating point for line (9, 3) => (9, 9) (no caching)
.......6: Generating point for line (3, 3) => (3, 9) (no caching)
.......7: Generating point for line (3, 9) => (9, 9) (no caching)
.......8: Generating point for line (1, 1) => (11, 1) (no caching)
...........9: Generating point for line (11, 1) => (11, 11) (no caching)
...........10: Generating point for line (1, 1) => (1, 11) (no caching)
...........11: Generating point for line (1, 11) => (11, 11) (no caching)
...........12: Generating point for line (3, 3) => (9, 3) (no caching)
.......13: Generating point for line (9, 3) => (9, 9) (no caching)
.......14: Generating point for line (3, 3) => (3, 9) (no caching)
.......15: Generating point for line (3, 9) => (9, 9) (no caching)
.......% 
*/

// the lines are generating twice, if we were already generating points for those objects, why are we generating them again? this is not a good thing

// When you have an adapter like the one we made, you end up inevitably generating temporary objects, you want to have some sort of control that if these temp objects need to be generated again for the same object, you don't generate them twice