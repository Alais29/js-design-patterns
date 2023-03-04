// Let's see an example with text formatting

// The idea is that you have text which you might want to format using some specifies, like bold or italic or underline it, let's try to emulate some of these processes

// So let's start with a FormattedText class which will receive plain text that we want to format
class FormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    // and in addition we also want to add some sort of formatting, let's suppose we want to have formatting which capitalizes certain characters in the plain text
    // One brute force approach would be to make another array of booleans, where for every character there's a boolean indicating whether the character should be capitalized or not, so first we create an array with the length of the plainText and make the values false
    this.caps = new Array(plainText.length).map(() => false)
  }

  // subsequently, we want to be able to capitalize a certain range
  capitalize(start, end) {
    // so we go through the caps array and flip every boolean in that range
    for (let i = start; i <= end; ++i) {
      this.caps[i] = true
    }
  }

  // and then we can implement toSring
  toString() {
    // so we make a buffer, that will start as an empty array and then we go through every letter/position in the plainText 
    let buffer = []
    for (let i in this.plainText) {
      //we get the character
      let c = this.plainText[i]
      // then we push this character, or this character capitalized to the buffer
      buffer.push(this.caps[i] ? c.toUpperCase() : c)
    }
    //then we return the buffer joined
    return buffer.join('');
  }
}

// now we can start using this formatted text
const text = 'This is a brave new world'
let ft = new FormattedText(text)
ft.capitalize(10, 15)
console.log(ft.toString()) // This is a BRAVE new world

// we get what we want but unfortunately we "paid" a lot of memory for the privilege

// Does it really make sense to have a boolean valur for every single letter? if we think on a large text, like a whole book, we're going to waste huge amounts of memory just storing that empty boolean, even though only a single word of the book gets capitalized, you're still going to pay the price in terms of memory for storing the booleans of all the characters in the book

// So let's make a class called BetterFormatedText and improve it
class BetterFormattedText {
  constructor(plainText) {
    this.plainText = plainText;
    // but this time wee're going to store some formatting, which will be populating later on
    this.formatting = []
  }

  // se explanation on line 94
  getRange(start, end) {
    let range = new TextRange(start, end);
    this.formatting.push(range)
    return range;
  }

  // see explanation on line 96
  toString() {
    let buffer = []
    for (let i in this.plainText) {
      let c = this.plainText[i]
      for (let range of this.formatting) {
        if (range.covers(i) && range.capitalize) {
          c = c.toUpperCase()
        }
      }
      buffer.push(c)
    }
    return buffer.join('')
  }
}

// to populate the formatting array we'll be making a new class
class TextRange {
  // TextRange will be our typical kind of flyweight object that basically stores information about the start and end of a range, as well as what you want to do with that range, what kind of formatting you want to apply, let's try with capitalize, but you could add pther formattings later on
  constructor(start, end) {
    this.start = start
    this.end = end
    this.capitalize = false;
    // the idea is to take the text range and if you turn the capitalized property to true, it means that the range from start to end position will be capitalized
  }

  // we then add an utility method which will tell us wether or not this range covers a particular position
  covers(position) {
    return position >= this.start && position <= this.end
  }
}

// now in BetterFormattedText we can add a method called getRange which will receive a start and end position and stores it in the formatting array, and we also return that range so that the user can subsequently customize that range

// we also implement the toString method in BetterFormattedText, but this time instead of looking at a boolean array, we check wether or not the particular point is inside the ranges specified in the formatting array. So we create a buffer and loop through every index in the plainText, get the character, and then loop through every range in the formatting array and if the range covers the position i and we want to capitalize the letter then we capitalize the character; and no mater if we capitalized it or not we add it to the buffer and then we return the buffer

// now let's try this BetterFormatedText
const bft = new BetterFormattedText(text)
// to capitalize a range, we first call getRange, and if we want to capitalize that range we set the capitalize flag to true
bft.getRange(16, 19).capitalize = true;
// and now if we call toString we will get the range capitalized
console.log(bft.toString()) //This is a brave NEW world

// so with this implementation, instead of storing lots and lots of data as in the case of the booleans in the first implementation, we instead make an array which will only have one element for every range we want to format