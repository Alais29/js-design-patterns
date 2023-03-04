// You are given a class called Sentence, which takes a string such as 'hello world'. You need to provide a method at(index) such that the method returns a flyweight that can be used to capitalize a particular word in the sentence.

// Typical use would be something like:

// let s = new Sentence('alpha beta gamma');
// s.at(1).capitalize = true;
// console.log(s.toString()); // alpha BETA gamma

class Sentence
{
  constructor(plainText) {
    // todo
    this.plainText = plainText;
    this.formatting = []
  }

  at(index) {
    // todo
    let word = new Word(index)
    this.formatting.push(word)
    return word
  }

  toString() {
    // todo
    let buffer = []; 
    for (let i in this.plainText.split(' ')) {
      let curWord = this.plainText.split(' ')[i]
      for (let word of this.formatting) {
        if (word.isWord(i) && word.capitalize) {
          curWord = curWord.toUpperCase()
        }
      }
      buffer.push(curWord)
    }
    return buffer.join(' ')
  }
}

class Word {
  constructor(index) {
    this.index = index
    this.capitalize = false
  }

  isWord(position) {
    return position == this.index
  }
}

let s = new Sentence('alpha beta gamma');
s.at(1).capitalize = true;
console.log(s.toString()); // alpha BETA gamma