/*---ES6 Classes---*/
/*Resources:
  - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
/*When thinking of ES6 classes, don't get mislead by the new syntax. Under the
hood almost the exact same thing is happening as compared to ES5 constructor
functions.

Because of that I highly reccomend reading the following notes before continuing:
  - why_oop.js
  - arriving_at_the_prototype.js
  - prototype_in_depth.js
  - es5_inheritance.js
*/

/*There ARE in fact a few VERY HIGH LEVEL differences under the hood that the es6 
class provides which couldn't be implemented in es5 or es6 without that keyword. 
If you'd like to read up on it check out this link:
- https://stackoverflow.com/questions/36419713/are-es6-classes-just-syntactic-sugar-for-the-prototypal-pattern-in-javascript/47671709#47671709
*/

/*Here is an example of an ES6 base class (doesn't extend a parent class)*/
var MyClass = class {
  constructor(name) {
    //constructor function defined within the class
    this.name = name;
  }
  //methods defined within the class
  method1() {}
  method2(param1, param2) {}
};
var myInstance = new MyClass("Joe");
console.log(myInstance); // { name: 'Joe' }
console.log(myInstance.__proto__); //{method1: f method1() {}, method2: f method2(param1, param2) {}}

/*This is essentially syntactic sugar for the previous method which utilized
constructor functions*/

/*--Constructor Functions Example--*/
var MyConstructorFunc = function (name) {
  this.name = name;
};
MyConstructorFunc.prototype.method1 = function () {};
MyConstructorFunc.prototype.method2 = function (param1, param2) {};
var user1 = new MyConstructorFunc("Joe");
console.log(user1); //{ name: 'Joe' }
console.log(user1.__proto__); //{method1: f method1() {}, method2: f method2(param1, param2) {}}

/*The main benefit of this syntactic sugar is it encapsulates method and property
definition for a class all in one code block, whereas before you could really
just define the methods for a 'class' anywhere in your code far away from your 
constructor function*/

/*---Key Details in ES6 Syntax---*/
/*classes are really just 'special' functions*/
console.log(typeof MyClass); //function

/*And just as you can define function expressions and function declarations, so
to can you define class expressions and declarations*/

/*One key difference is that while functions can be called before they are
declared, the same is not true for classes. You will recieve an error if you try
to do this*/
try {
  var p = new Rectangle();
  class Reactangle {}
} catch (e) {
  console.log(e); // [ReferenceError: Rectangle is not defined]
}

/*The body of a class is executed in 'strict mode', i. e., code written
here is subject to stricter syntax for increased performance.
 - Examples:*/
/*constructor method not in strict mode*/
function PersonF(name, age) {
  this.name = name;
  this.age = age;
  NaN = 5; //assignment to non writable global is a silent error
}
var person1 = new PersonF("John", 23);

/*class in strict mode*/
try {
  class PersonC {
    constructor(name, age) {
      this.name = name;
      this.age = age;
      NaN = 5;
    }
  }
  var person2 = new PersonC("Jimmy", 25);
} catch (e) {
  console.log(e); //TypeError: Cannot assign to read only property 'Nan' of object '#<Object>'
}

/*A method must be defined like so in order for it to be correctly identified
as a method and placed on the constructor function's(the class's constructor
functions) prototype*/
var Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  /*these methods below will be on the prototype, aka not repeated in memory
  for every single instance of the Person class*/
  walks() {
    console.log("I'm walking");
  }
  speaks() {
    console.log("I'm speaking");
  }
  /*the methods below are improper use of methods and are actually something
  called 'public instance fields'. We'll get to them in the es6_beyond.js but
  the important thing to remember for now is if you define a function like how
  I do below, that function will be repeated for every instance of the class*/
  jumps = function () {
    console.log("I'm jumping");
  };
  flys = () => {
    console.log("I'm flying");
  };
};
var person1 = new Person("John", 23);
var person2 = new Person("Tim", 25);
console.log(person1.hasOwnProperty("walks")); //false (Not on the instance)
console.log(person1.__proto__.hasOwnProperty("walks")); //true (on the proto)
console.log(person1.hasOwnProperty("jumps")); //true (on the instance)
console.log(person1.hasOwnProperty("flys")); //true (on the instance)

/*Constructor Method*/
/*The constructor method is a special method within classes for 
creating and initializing an object. There can only be one 'constructor'
method within a class.*/

/*The super keyword can be called within the constructor method in order to call
the constructor of the parent class*/
var Person = class {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
};
var Teacher = class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }
};
var teacher1 = new Teacher("John", 28, "Science");

/*---Inheritance and Child Classes---*/
/* In order to create a subclass in ES5 you had to do three main things:
  - Call the parent class's constructor function
  - Rearrange the prototype chain so we can inherit the parent class's methods
  - Overwrite the 'constructor' property so as properly set it to the sub class
  constructor function

In ES6 classes, this is a lot easier*/

/*First when defining a subclass we need to use the 'extends' keyword*/
/*Then use the 'super' keyword to call the parent class's constructor*/
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log("Noise");
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name); //calling the parent class's constructor
    this.breed = breed;
  }

  speak() {
    super.speak(); //we can also access the parent class's methods by using super
    console.log("Bark");
  }
}
var dog = new Dog("Rex");
dog.speak(); //Noise //Bark

/*IMPORTANT NOTE*/
/*super must be called before you can use the keyword 'this' in a derived
class (sub-class). So make sure you never leave that super() call out*/

/*I will not be showing it here but a cool thing to note is that classes 
can actually inherit from classical constructor functions too. Just use
the extends keyword the same way. However if you want to extend something
thats "non-constructible" then you'll need to do it the old fashioned way
by setting the prototype on the Class*/

/*Thats pretty much it. Classes are clearly an easier way to create encapsulated
logic and data and using 'extends' and 'super' make it fairly easy to create
new sub classes*/
