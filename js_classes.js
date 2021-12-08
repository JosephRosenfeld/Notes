/*JS classes has multiple version since JS is always changing:
 -Pre ES6 (would use constructor functions and setting methods on prototypes)
 -ES6 (introduced class keyword, constructor method, super keyword)
 -ES6 post (class fields being introduced, static and private fields)
*/

/*Its also important to note that JS classes are still by and large mostly syntactic
sugar and JS is not like other class based languages like Java. In Java a class is 
a template for an object, once an object is instantiated in Java it has no relation
to its parent class

This is not the case in Javascript. It creates an object that is linked with its
prototype... and changes to that prototype, EVEN AFTER INSTANTIATION, are propogated
to the new object.*/

/*Base Classes
  -A class declaration that doesn't use the 'extends' keyword*/

//JS Classes are pretty much syntactic sugar (with a few exceptions)
/*JS Class declarations aren't hoisted like function or variable declarations*/
//JS Classes are typically written like this:
/*The below method was essentially created for ES6 in 2015, before that one would have
to create something called a constructor function in order to accomplish the same result
and then add functions on to the prototype of the function*/

/*--ES6 Classes--*/
class MyClass {
  constructor(name) {
    this.name = name;
  }
  //methods
  method1() {} //This is using the short syntax for defining functions
  method2(param1, param2) {}
}
//All methods defined this way are set on the prototype
let myInstance1 = new MyClass();
myInstance1.__proto__
/*All though the above has the methods seperated from the constructor as public fields
syntax and therefore doesn't require autobinding because arrow functions are used?*/

/*--Constructor Functions--*/
function MyConstructorFunc(name) {
  this.name = name;
}
MyConstructorFunc.prototype.method1 = function () {};
MyConstructorFunc.prototype.method2 = function (param1, param2) {};
let john = new MyConstructorFunc("john");
let timmy = new MyConstructorFunc("tim");
/*An advantage of defining a function on the prototype is that if you need to
overwrite the function later on, you only need to do it once, instead of having to
overwrite it on every class instance.*/
MyConstructorFunc.prototype.method1 = function (lastName) {
  this.name += lastName;
};
john.method1("Smith");
timmy.method1("Turner");

console.log(john.name);
console.log(timmy.name);
/*Another advantage of defining a function on the prototype is that the function
definition is stored up the prototype chain on the functions prototype. Therefore a
new function isn't stored in memory for every single instance of the constructor function*/
console.log(john.method1 === timmy.method1); //outputs true
/*You can still add methods within the constructor function as shown below,
however this will create a new function in memory per instance of the class*/
function MyConstructorFunc2(name) {
  this.name = name;
  this.method1 = function () {};
  this.method2 = function (param1, param2) {};
}
let john2 = new MyConstructorFunc2("John");
let timmy2 = new MyConstructorFunc2("Timmy");
console.log(john2.method1 === timmy2.method1); //false

//Private fields and methods
//Define a private field with a pound sign

class MyClass2 {
  constructor(name) {
    this.name = name;
  }
  #privateMethod(param1) {
    return test + 2;
  }
  publicMethod(param1) {
    return this.#privateMethod(param1);
  }
}

/*It is also common convention to denote a private method or variable by 
beginning it with an underscore, however this is just convention and doesn't actually
impact anything
class MyClass2 {
  constructor(name) {
    this.name = name;
  }
  _privateMethod(param1) {
    return test + 2;
  }
  publicMethod(param1) {
    return this._privateMethod(param1);
  }
}*/

/*You can't access static properties from an obj instance
  For Example:*/

/*class MyClass {
  static classProp = "a";
  constructor() {
    this.name = "John Smith";
  }
}
let myInstance = new MyClass();
console.log(myInstance.nonExistantProp); //undefined (non existant properties return undefined by default)
console.log(myInstance.classProp); //undefined
console.log(MyClass.classProp); //a
*/
