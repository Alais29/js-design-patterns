/*
======
TLDR
======
Sometimes you get an interplay of different complicated systems, but what you want is, first, a single unified interface, and second, a sensible set of defaults. So the facade is basically hiding some of the implementation complexity, hiding the interplay between different subsystems and just providing a single interface to use the system, but it also allows you to get in deep and start using the low level methods as well
*/

// For this facade example, it's going to be somewhat synthetic in that the code won't actually run, the reason being that tipically facade involves complex subsystems which we don't have at the time, and takes a lot of time to build

// The example relates to the console, which you might think is a trivial kind of construct, but in reality, the console is really complicated and involves several different classes, one of which is a Buffer, it needs a buffer because it has to store the characters somewhere before outputting them to the screen

// the buffer is some sort of an array of characters
class Buffer extends Array {
  //it would tipically have a constructor which specifies the width and height of the buffer (how much characters do you want to store in the horizontal and vertical dimension)
  constructor(width = 30, height = 20) {
    super()
    this.width = width
    this.height = height
    this.alloc(width * height);
  }

  // the idea of a buffer is that you write things to that buffer 
  write(text, position = 0) {
    // this is where you would actually write the elements to that buffer
  }
}

// Now, a buffer gets presented on the screen through a view
class Viewport {
  constructor(buffer = new Buffer()) {
    this.buffer = buffer
    this.offset = 0
  }

  // some viewports can give you an ability to append text to that viewport
  append(text, pos) {
    this.buffer.write(text, pos + this.offset)
  }

  // the viewport could also have a method to get a character at a particular index simply using the viewport to look into the buffer at a particular offset and getting that character
  getCharAt(index) {
    return this.buffer[this.offset + index]
  }
}

// Now, this is getting rather complicated, most of us don't even think about consoles in terms of buffers and viewports, we just want a console with a single buffer, a single viewport and a sensible set of defaults; and that's exactly where the facade pattern comes in

// A console is basically a facade for a subsystem related to buffers and buffer management, a subsystem related to viewports, etc, and the typical buffer would probably also be using other data structures like a circle of buffer to actually cycle things, there are special buffers for presenting tables, etc.

// but we just want a classical console that somebody can call the constructor for, get a sensible set of defaults and get up and running quickly, and that's exactly what we'd tipically have

class Console {
  // a console which takes in a set of defaults
  constructor() {
    this.buffer = new Buffer()
    this.currentViewport = new Viewport(this.buffer)
    this.buffers = [ this.buffer ]
    this.viewports = [this.currentViewport]
  }

  // and then we can provide high level methods for the console to operate on the underlying buffers
  write(text) {
    this.currentViewport.buffer.write(text)
  }

  // you could also expose the lower level APIs through the facade, for example to get a character at a specific position
  getCharAt(index) {
    return this.currentViewport.getCharAt(index)
  }
}

// Now all the user has to do, is create a new console and use it, without knowing all the implementation details underneath
let c = new Console();
c.write('hello')
let ch = c.getCharAt(0);
