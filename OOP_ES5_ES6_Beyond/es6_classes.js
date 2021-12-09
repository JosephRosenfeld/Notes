/*---ES6 Classes---*/
/*Its also important to note that JS classes are still by and large mostly syntactic
sugar and JS is not like other class based languages like Java. In Java a class is 
a template for an object, once an object is instantiated in Java it has no relation
to its parent class

This is not the case in Javascript. It creates an object that is linked with its
prototype... and changes to that prototype, EVEN AFTER INSTANTIATION, are propogated
to the new object.*/

/*Example of an ES6 base class (doesn't extend a parent class)*/
class MyClass {
  constructor(name) {
    //constructor function defined within the class
    this.name = name;
  }
  //methods defined within the class
  method1() {}
  method2(param1, param2) {}
}
var myInstance = new MyClass("Joe");
console.log(myInstance); // { name: 'Joe' }
console.log(myInstance.__proto__); //{method1: f method1() {}, method2: f method2(param1, param2) {}}

/*This is essentially syntactic sugar for the previous method which utilized
constructor functions*/

/*--Constructor Functions Example--*/
function MyConstructorFunc(name) {
  this.name = name;
}
MyConstructorFunc.prototype.method1 = function () {};
MyConstructorFunc.prototype.method2 = function (param1, param2) {};
var user1 = new MyConstructorFunc("Joe");
console.log(user1); //{ name: 'Joe' }
console.log(user1.__proto__); //{method1: f method1() {}, method2: f method2(param1, param2) {}}
