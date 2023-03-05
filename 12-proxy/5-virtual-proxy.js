/*
======
TLDR
======
A virtual proxy is basically an object that's masquerading as something that's present, whereas it might not really be there until the moment when you actually need it
*/

// a virtual proxy shows you that you have a resource, even though in reality you might not have it yet; it masquerades as a real object while not exactly being real 

// Suppose we have an application which shows people images, an implementation of Image could be something like this

class Image {
  constructor(url) {
    this.url = url
    // let's assume that we actually load the image from this url
    console.log(`Loading image from ${url}`);
  }

  // then you want to perform the actual drawing of that image, but remember we've already loaded the image supposedly
  draw() {
    console.log(`Drawing image from ${this.url}`);
  }
}

// this might look like a good implementation, but there's a problem, if you never call draw, you've already wasted computational time on actually loading the image from the remote url, so the question is, how to set things up so that when somebody never calls draw, you never actually load the image? here's where the virtual proxy comes in.

function drawImage(img) {
  console.log(`About to draw the image`)
  img.draw();
  console.log(`Done drawing the image`)
}

// if we make an ordinary image, as we just defined, it'll look like the following 
let img = new Image('http://pokemon.com/pikachu.png')
drawImage(img)

// and the log sequence would be something like this:
// Loading image from http://pokemon.com/pikachu.png
// About to draw the image
// Drawing image from http://pokemon.com/pikachu.png
// Done drawing the image

// if we don't call drawImage, we're still loading the image, that's the problem we want to avoid

// In this case we can use the virtual proxy, which only gives you the impression that you actually have the image, but you don't have it up until the point where you actually need to draw the image

// so let's make a LazyImage, which will have the same constructor and interface, except that in the constructor we only set the url 
class LazyImage {
  constructor(url) {
    this.url = url
  }

  draw() {
    // now in this method, we want to make an underlying image because at this point we need it, unless we've already constructed it

    // so if we don't have an image , construct it
    if (!this.image) this.image = new Image(this.url)
    // if we already have an image, we use the undeerlying image to perform the actual drawing
    this.image.draw()
  }
}

// and now the implementation would work like this
let img2 = new LazyImage('http://pokemon.com/pikachu.png')
drawImage(img2)

// if we run this, the loggin would be as such:
// About to draw the image
// Loading image from http://pokemon.com/pikachu.png
// Drawing image from http://pokemon.com/pikachu.png
// Done drawing the image

// the sequence has changed, only when we're about to draw the image, the image is loaded from the url location

// if we never call drawImage, the image won't be loaded