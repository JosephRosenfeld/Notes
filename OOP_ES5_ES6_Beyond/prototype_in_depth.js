/*---Prototype In Depth---*/
/*Resources:
  - https://javascript.info/prototypes
  - https://stackoverflow.com/questions/9959727/proto-vs-prototype-in-javascript

/*---Going Up The Chain---*/
/*An important concept to understand before going forward is that every obj
in JS has a prototype. (with one caveot)*/

/*When an object doesn't have a specified property, the JS engine will look
through its __proto__ property chain to find it. If it goes all the way up
the prototype chain and doesn't find the property/method, then it will return
an error*/

/*This is how JS emulates inheritance, even if an obj doesn't have a 
specific property or method, it might have 'inherited' that property or method
from its prototype, or from its prototype's prototype, and so on and so forth*/
/*Ex:*/
var UserCreator = function (name) {
  this.name = name;
};
UserCreator.prototype.hello = function () {
  console.log("hello");
};
var user1 = new UserCreator("Joe");
user1.hello(); //"hello"
/*The JS engine first looks at the user1 object to see if it has a 'hello' method.
Once it realizes that user1 doesn't have the method we're looking for, it will
then search its prototype object, and eventually this is where the 'hello' 
method is found!*/

/*You've actually been using prototype methods and properties this the whole 
time without even knowing it. When you create a new array, on the back end its 
actually just using a constructor function (well I assume its actually more complicated than that but for our 
purposes lets go with it). By using a constructor function our new array is
automatically assigned to inherit methods from the Array.prototype object!*/
var arr = []; //same as var arr = new Array();
arr.push(1, 2, 3);
console.log(arr.hasOwnProperty("push")); // false
console.log(arr.__proto__.hasOwnProperty("push")); // true

/*The JS engine will start from the current obj and work its way up till it
finds the specified property. This means if you want to overwrite an inherited
property, all you need to do is set that very same property lower down on the
prototype chain*/
var arr = [];
arr.push = function () {
  console.log("overwritten");
};
arr.push(1, 2, 3); //overwritten
console.log(arr.hasOwnProperty("push")); //true

/*But if every object has a prototype, including prototype objects becaue remember
a prototype is just a normal JS object in the back end, wouldn't the JS engine
search forever to find unspecified properties? Well I actually told a little
while lie above, not EVERY single object has a prototype obj by default. In fact
the only JS obj that doesn't have one is the Object.prototype.*/
console.log(Object.prototype.__proto__); //null
/*And because almost everything in JS has the Object.prototype obj on its
prototype chain, this is where JS engine will terminate its search*/

/*---ES5 Object Literal Inheritance Chain---*/
/*Its important to note that this __proto__ property can actually be
overwritten and set to point to a completely different object than it would
natively. By setting the __proto__ property we can manually create an 
'inheritance' like behavior with our objects that differs from what JS 
would have done otherwise. Take a look at the simple example below:*/
var animal = {
  ableToMove: true,
};
var mammal = {
  ableToLayEggs: false,
  __proto__: animal,
};
console.log(mammal.ableToMove); //true

/*We could even set this __proto__ property to null so as to cut off any 
inheritance it might have had from farther up the chain*/
console.log(mammal.toString); //f toString()
mammal.__proto__ = null;
console.log(mammal.toString); //undefined

/*JS only allows for the __proto__ property to be set to an object or null,
any other data types will be ignored. (MDN docs say this but I'm getting some
odd behavior if I set the __proto__ to null first and then try to do
manipulations on it. I think once its set to null then the property is almost
considered 'removed' and then resetting that property doesn't turn the __proto__
property into anything special. this is all speculation though and the first
sentence is what you should*/
var user1 = new Object();
console.log(user1.__proto__); //{}
user1.__proto__ = "Non object or null prototype will be ignored";
console.log(user1.__proto__); //{}

/*One thing that you aren't allowed to do in JS is create cycles with your 
prototype objects. This will throw an error*/
var animal = {};
var mammal = {
  __proto__: animal,
};
var dog = {
  __proto__: mammal,
};
try {
  animal.__proto__ = dog;
} catch (e) {
  console.log(e); // [TypeError: Cyclic __proto__ value]
}

/*---The 'constructor' Property---*/
/*All prototypes have a 'constructor' property which points to the constructor
function*/
var UserCreator = function (name) {
  this.name = name;
};
var user1 = new UserCreator("Joe");
console.log(UserCreator.prototype.constructor === UserCreator); //true

/*This constructor property is created by default whenever a prototype object
is created and a prototype object is created whenever you create a function*/
function exampleFunc() {
  //function created
  console.log("I'm an example");
}
console.log(exampleFunc.prototype); //{} //prototype created by default
console.log(exampleFunc.prototype.constructor == exampleFunc); //true //constructor property put on prototype by default and set to point to the function

/*Because its on the prototype, you technically have access to this 'constructor'
property lower down on the prototype chain:*/
console.log(user1.constructor === UserCreator); // true

/*This can be used to create an object using the same constructor function
as was used in another object (useful if you don't have access to the constructor
function because its a third party library or what have you)*/
var user2 = new user1.constructor("John");
console.log(user2); // { name: 'John' }

/*Something to keep in mind though is that JS doesn't ensure that this 
'constructor' property is correct so it could be overridden to the wrong val*/
UserCreator.prototype.constructor = 5;
console.log(UserCreator.prototype.constructor === UserCreator); //false

/*---Primitive Wrapping---*/
/*You may have noticed that I said all objects have prototypes, thats why a lot
of native data type objects in JS (array being one of them) have different
methods/properties already available. But what about primitive types?

A String can't hold properties after all so how does the following work?*/
var str = "3";
console.log(str.charCodeAt(0)); //51

/*Well it turns out during execution, the JS engine will see that a method/prop
is trying to be accessed on that primitive and it will actually wrap it inside
of an object. We won't go in depth here but just know its much more memory 
effecient to rely on wrapping during execution time as opposed to using
the primitive constructor to create the primitive (like below)*/
var str = new String("3"); //stores it as an object in memory

/*---Deprecated Property __proto__---*/
/*I won't be writing on it extensively here but essentially you should know that
__proto__ isn't the same thing as the actual [[prototype]] property on an object.
__proto__ is actually the getter / setter for [[prototype]].*/

/*The reason its being deprecated is because if you want to create a 'very plain
object' aka just an associative array of key value pairs, then the __proto__ 
properties uniqueness can cause some serious issues.*/

/*Instead of using the __proto__ property getter and setter, instead you should
use these three utilities:
  - Object.create(param), creates an object and sets its prototype to the param
  given. Can also be set to null if you just want an associative array with
  nothing else in it*/
var user1 = Object.create(null);
console.log(user1.toString); //undefined
/*- Object.setPrototypeOf()
  - Object.getPrototypeOf()
  those two are self explanatory*/
