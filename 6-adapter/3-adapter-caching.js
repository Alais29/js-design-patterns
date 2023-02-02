/*
======
TLDR
======
Sometimes the adaptive design pattern causes you to generate temporary objects, so it makes sense to try to cut down the number of objects actually generated by using some sort of cache
*/


// In our previos implementation we can see that if we call de drawPoints function twice we keep generating the points even though we've already done them somewhere in the past

// If a line goes form 0-0 to 10-0 I want the points geneated once and on every subsequent call I want to reuse them.

// To achive this we'll implement caching, which means that we store the precomputed points and we just yield them if they are already available without regenerating them again.

let drawPoint = function (point) {
  process.stdout.write('.');
}

// One piece that we'll use for this is a hash code function for a string, what it does is that for every string it gives you an unique 32bit integer, if a string changes, you'll have a different integer representing that string

String.prototype.hashCode = function(){
  if (Array.prototype.reduce){
    return this.split("").reduce(function(a,b){
      a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
  }
  let hash = 0;
  if (this.length === 0) return hash;
  for (let i = 0; i < this.length; i++) {
    const character = this.charCodeAt(i);
    hash  = ((hash<<5)-hash)+character;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return hash;
};

// (go to line 72 to see its implementation)

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  toString() {
    return `(${this.x}, ${this.y})`
  }
}

class Line { 
  constructor(start, end) {
    this.start = start
    this.end = end
  }

  toString() {
    return `${this.start.toString()} => ${this.end.toString()}`
  }
}

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

let vectorObjects = [
  new VectorRectangle(1, 1, 10, 10),
  new VectorRectangle(3, 3, 6, 6),
]

class LineToPointAdapter {
  constructor(line) {
    // before doing anything else, we're going to calculare a hash code for a given line.
    this.hash = JSON.stringify(line).hashCode()
    
    // now we check if we already have that hash in our store (line 105), if it is, we don't need to do anything else
    if (LineToPointAdapter.cache[ this.hash ])
      return

    console.log(`${LineToPointAdapter.count++}: Generating point for line ${line.toString()} (no caching)`)

    // now the class doesn't even have to extend Array anymore, we can just create an array of points and populate it
    let points = [];

    let left = Math.min(line.start.x, line.end.x);
    let right = Math.max(line.start.x, line.end.x);
    let top = Math.min(line.start.y, line.end.y);
    let bottom = Math.max(line.start.y, line.end.y);

    if (right - left === 0) {
      for (let y = top; y <= bottom; ++y) {
        points.push(new Point(left, y));
      }
    } else if (line.end.y - line.start.y === 0) {
      for (let x = left; x <= right; ++x) {
        points.push(new Point(x, top));
      }
    }
    // and then we add the points to the overall cache
    LineToPointAdapter.cache[this.hash] = points
  }

  get items() {
    return LineToPointAdapter.cache[this.hash];
  }
}

//I need some sort of common storage for all of these pre computed points, so we'll create the variable cache inside the LineToPointAdapter, which will initially be an empty dictionary, but it'll eventually have a key of the hash code and the value will be an array of the actual points
LineToPointAdapter.count = 0
LineToPointAdapter.cache = {}

let drawPoints = function () {
  for (let vo of vectorObjects)
    for (let line of vo) {
      let adapter = new LineToPointAdapter(line);
      adapter.items.forEach(drawPoint);
    }
}

drawPoints()
drawPoints()

//now, no matter if we call the function twice, we're only generating the points the first time only

// Output:
// 0: Generating point for line (1, 1) => (11, 1) (no caching)
// ...........1: Generating point for line (11, 1) => (11, 11) (no caching)
// ...........2: Generating point for line (1, 1) => (1, 11) (no caching)
// ...........3: Generating point for line (1, 11) => (11, 11) (no caching)
// ...........4: Generating point for line (3, 3) => (9, 3) (no caching)
// .......5: Generating point for line (9, 3) => (9, 9) (no caching)
// .......6: Generating point for line (3, 3) => (3, 9) (no caching)
// .......7: Generating point for line (3, 9) => (9, 9) (no caching)
// ...............................................................................%      

// for the first 8 calls we generate the lines, for the next 8 calls, there is no adapter invocation anywhere (line 131) because the points have already been calculated and we only output them