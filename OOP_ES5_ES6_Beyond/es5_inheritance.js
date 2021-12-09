/*--- ES5 Inheritance ---*/
/*Resources:
  - https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance


/* It's important to understand how prototypal inheritance works because under
the hood in later versions of ECMAScript the principles still apply even though
the syntax may get more abstracted*/

/*Lets look at a typical ES5 'class definition' (constructor and prototype methods)*/
var Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.greeting = function () {
  console.log("Hi");
};
Person.prototype.walk = function () {
  console.log("I'm walking");
};
var person1 = new Person("John", 23);
person1.greeting(); //Hi
person1.walk(); //I'm walking
/*We should be fairly familiar with this code by now*/

/*Lets say we want to create another class called Teacher. This class should 
have all the properties and methods that a Person does (after all a teacher is 
a person) but it should also have some properties specific to being a teacher, 
like the subjects she teaches and maybe their greeting should be a little
more formal*/
var Teacher = function (name, age, subject) {
  this.name = name;
  this.age = age;
  this.subject = subject;
};
Teacher.prototype.greeting = function () {
  console.log("Hello class!");
};
Teacher.prototype.walk = function () {
  console.log("I'm walking");
};
var teacher1 = new Teacher("John", 23, "science");
teacher1.greeting(); // Hello class!
teacher1.walk(); //I'm walking

/*Now this isn't bad, but it feels pretty redundant no? I mean we basically had
to duplicate all our Person class code just to recreate some functionality/
properties and for a simple class thats ok, but what about classes with hundreds
of attributes and methods, or what if we need to make several different sub-classes.
You can see that that would get out of hand very quickly*/

/*If only there were a way to make it so that a Teacher instance, would naturally
inherit from the Person class so we didn't have to rewrite so much code*/
/*Well lets think that through, if we wanted a Teacher instance to inherit
from the Person class how would we go about doing that?*/

/*I think the first step would be in making sure I don't need to rewrite two
entire constructor functions that essentially do the same thing with slight
variations, so something like this:*/
var Teacher = function (name, age, subject) {
  Person.call(this, name, age);
  this.subject = subject;
};
Teacher.prototype.greeting = function () {
  console.log("Hello class!");
};
var teacher1 = new Teacher("John", 23, "Science");
console.log(teacher1); //{ name: 'John', age: 23, subject: 'Science }
teacher1.greeting(); // Hellow class!
try {
  teacher1.walk();
} catch (e) {
  console.log(e); // [TypeError: teacher1.walk is not a function]
}

/*Lets break down whats happening here:
  - First we call the Teacher constructor function with the 'new' keyword.
    -The 'new' keyword essentially sets the value of 'this' within that
    constructor function's execution context to a new empty object with some
    default properties (__proto__ = Teacher.prototype).
  - Then we call the Person constructor function using the 'call' method.
    -This is important, its easy to think we're creating a new Person object
    since we're using that constructor function, but remember since we're not
    calling that Person constructor function with the 'new' keyword, no new obj
    will be created and the 'this' keyword won't be set to that new obj. instead
    with the 'call' method, what the 'this' keyword should be referencing is 
    actually the first paramater.
    -When we say func.call(obj, param1, param2); We're essentially saying, "hey,
    execute function 'func' and within that execution context, set the value of
    'this' to refer to 'obj'. And use param1 and param2 as params for the 'func'
    function.
      -Except in our specific case, we don't pass in an 'obj', we actually pass
      in the current this value. Which, if you remember, is set to an empty object
      since our current execution context is a constructor function that was invoked
      using the 'new' keyword.
  - Then we set any properties that are specific to the teacher "this.subject =
  subject"*/

/*This works great however as you can see, we still don't have access to the methods
of the parent class (teacher1.walk is not a function)*/
/*That should be as simple as rearranging the prototype chain like so:*/
var Teacher = function (name, age, subject) {
  Person.call(this, name, age);
  this.subject = subject;
};
Teacher.prototype.greeting = function () {
  console.log("Hello class!");
};
Teacher.prototype.__proto__ = Person.prototype; //rearranging the proto chain to inherit correctly
var teacher1 = new Teacher("John", 23, "Science");
console.log(teacher1); //{ name: 'John', age: 23, subject: 'Science }
teacher1.greeting(); // Hellow class!
teacher1.walk(); //I'm walking

/*NICE! now the teacher1 instance is properly inheriting all the methods
from the Person prototype. I used the .__proto__ property here because
thats what I've been using but its worth noting that __proto__ is being deprecated
and really we should use the Object.create() method for setting the prototype:*/
Teacher.prototype = Object.create(Person.prototype);
Teacher.prototype.greeting = function () {
  console.log("Hello class!");
};
var teacher2 = new Teacher("Jimmy", 25, "Math");
teacher2.walk(); //I'm walking

/*However there still is one problem, what about the constructor reference?
An objects prototype should always have a constructor property that points to the
constructor function but as we can see, thats not set correctly here*/
console.log(Teacher.prototype.hasOwnProperty(constructor)); //false
/*Because Object.create sets the prototype of the newly created object, but
doesn't set its constructor value*/

/*We can do this manually like so:*/
Teacher.prototype.constructor = Teacher;
console.log(Teacher.prototype.constructor == Teacher); //true

/*The above would work fine but if you want the technically correct version
for enumeration purposes use the Object.defineProperty way shown below:*/
Object.defineProperty(Teacher.prototype, "constructor", {
  value: Teacher,
  enumerable: false, //so it doesn't show up in 'for in' loops
  writable: true,
});
console.log(Teacher.prototype.constructor == Teacher); //true

/*Written all together, it should look like this:*/
var Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.greeting = function () {
  console.log("Hi");
};
Person.prototype.walk = function () {
  console.log("I'm walking");
};

var Teacher = function (name, age, subject) {
  Person.call(this, name, age); //initialize parent class properties
  this.subject = subject; //set subclass specific properties
};
//Set the Teacher.prototype property to point to an obj that inherits from Person.prototype
Teacher.prototype = Object.create(Person.prototype); //Now all methods are inherited
//Set constructor property to point to Teacher on the Teacher.prototype obj with all its nuance
Object.defineProperty(Teacher.prototype, "constructor", {
  value: Teacher,
  enumerable: false, //so it doesn't show up in 'for in' loops
  writable: true,
});

/*There you have it folks, that is inheritance as per the ES5 standards and syntax*/

/*--------------------------------------------------------*/
/*Read about ES6 classes next in es6_classes.js*/
