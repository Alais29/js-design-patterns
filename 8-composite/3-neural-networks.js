/*
======
TLDR
======
You can successfully connect both single objects an collection objects together if you can get the single object to masquerade itself as if it were a collection
*/

const { aggregation } = require('./aggregation')

// Let's see a more complicated implementation of the composite design pattern (Ignore the connectable class for now, it will be explained below)

class Connectable {
  connectTo(other) {
    // and we're going to assume that "this" as well as "other" are innumerable entities, that you can iterate both the connectable that you're connecting from and the connectable you're connecting to
    for (let from of this) {
      for (let to of other) {
        // and now we can connect them together as before
        from.out.push(to)
        to.in.push(from)
      }
    }
  }
}

// neural nwtworks are composed of neurons, which we can define as a class with a certain number of input and output connections

class Neuron extends Connectable{
  constructor() {
    super()
    // these arrays will be populated, allowing us to connect neurons to other neurons 
    this.in = []
    this.out = []
  }

  // we'll have a connectTo method where we'll specify the other neuron to connect to and populate their respective in and out list
  // FIRST IMPLEMENTATION
  // connectTo(other) {
  //   this.out.push(other)
  //   other.in.push(this)
  // }

  toString() {
    return `A neuron with ${this.in.length} inputs and ${this.out.length} outputs`
  }

  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this,
        done: returned++ // when you do a ++ on a false, it becomes true
      })
    }
  }
}

// now we can connect neurons like this:
let neuron1 = new Neuron();
let neuron2 = new Neuron();

neuron1.connectTo(neuron2)

//console.log(neuron1.toString()) // A neuron with 0 inputs and 1 outputs
//console.log(neuron2.toString()) // A neuron with 1 inputs and 0 outputs

// but now let's imagine that you decide to introduce collections of neurons, a neuron layer, and you want to connect this layer to a single neuron or an entire layer

// so we'll have a class called NeuronLayer, which extends Array because it will be esentially an array of neurons
class NeuronLayer extends aggregation(Array, Connectable) {
  // in the constructor we specify how many neurons we want in this neuron layer (count)
  constructor(count) {
    super()
    // and we create the specified neurons in the count
    while (count --> 0) {
      this.push(new Neuron())
    }
  }

  toString() {
    return `A layer with ${this.length} neurons`
  }
}

// we can now create layers:
let layer1 = new NeuronLayer(3)
let layer2 = new NeuronLayer(4)

// now we want that neurons and neuron layers to be interconnectable, we want to be able to connect a neuron to a neuron, a neuron to a neuron layer, viceversa and a layer to a layer as such:
// neuron1.connectTo(neuron2)
// neuron1.connectTo(layer2)
// layer2.connectTo(neuron1)
// layer1.connectTo(layer2)

// but we don't want to create 4 different methods for this, we just want one single method, and this is when the composite design pattern comes into play. So the implementation of connectTo no longer works (line 36)

// what we'll do to support this idea is to create a base class called connectable which will have the connectTo method (line 12) and now we can make both the neuron and the neuron Layer classes inherit from this base class.

// In the case of neuron there is no problem (line 27). But there's a problem with the neuron layer class since it's already extending the Array class, and it can't extend 2 classes, so we'll agregate a chunk of code that will allow us to extend several base classes (see aggregation.js file)

// if we run this as is, we'll still get the error "this is not iterable" on the connectable class, and the reason why is because neuron is not iterable yet and it has to be iterable; so a the class Neuron has to be able to masquerade as a collection of neurons consisting of a single element, which is that particular neuron. We can implement this in JS with the iterator Symbol (line 46)

// the iterator symbol will be used whenever a for method is called on the Neuron class, it will iterate through it using the iterator, which will return the element just once

// with this we now have a working scenario where we can do this:
neuron1.connectTo(layer1);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);

console.log(neuron1.toString()) // A neuron with 4 inputs and 4 outputs
console.log(neuron2.toString()) // A neuron with 1 inputs and 0 outputs
console.log(layer1.toString()) // A layer with 3 neurons
console.log(layer2.toString()) // A layer with 4 neurons