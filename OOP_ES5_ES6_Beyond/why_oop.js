/*---WHAT IS OOP---*/

/* Object Oriented Programming (OOP) is a programming paradigm that can be 
defined in a multitude of ways depending on the site or article you're reading.*/

/*At its core all OOP is, is programming in a way that couples functionality to 
specific data. Whenever you're thinking about OOP, think "we want to pair the
correct functionality with the pertinent data".*/
//^^^^^^^KEY DEFINITION^^^^^^^ (pair functionality to pertinent data)

/*OOP is often contrasted with functional programming, where you declare several
"pure" functions (functions that don't have side effects, don't effect global state,
same input = same output). *(Should be noted that functional programming isn't
necessarily just programming with "pure" functions, for the purposes of this 
article we define it as such)

With functional programming its very intuitive to recognize
its inherent value. Have some functionality sectioned off that takes a dynamic
input and returns a value. This can drastically cut replicated code and often
times provides a clear flow of logic and an easier time doing your debugging.*/

/*With OOP its less clear as to what its value is until you're dealing with 
much larger and more complex code bases. In such code bases, the idea of coupling
your functionality with the pertinent data becomes much more important*/

/*---WHY OOP?---*/ /*(Every site says diff things but here are a few I found)
/*OOP makes it easy to add features and functionality*/
/*Performant (efficient in terms of memory use)*/
/*Easy for use with other developers (they know exactly where the functionality
  is for a given piece of data)*/
/*Reuse of code through inheritance */
/*Helps model complex problems through simple, reuseable objects*/

/*---OOP Technical Definition---*/
/*Abstraction:
 - Selcting only the relevant specific data out of a larger pool of data. Aka
  hiding unrelevant data from the user. The object provides public methods /
  properties that let you interact with said object without knowing the specific
  implementation details that are going on within the object.
 Encapsulations:
  -When an object maintains its own private state, which can be accessed
  through public fields/methods.
 Inheritance:
  - Its exactly what it sounds like. The ability for an object to "inherit" 
  properties or methods or some functionality from another object.
 Polymorphism:
  - How a template can vary depending on its implementation. The typical
  example is with dynamic polymorphism in Java. When you create a subclass
  you can add a method that overwrites the parent class's method. The 
  interperter will default to the overridden method therefore now the subclass
  has different behavior than its parent class.
  - Put simpley, Polymorphism is the ability for an object to take on many forms  
*/

/*JS OOP have had multiple implementations since JS is always changing:
 -Pre ES6 (would use constructor functions and setting methods on prototypes)
 -ES6 (introduced class keyword, constructor method, super keyword)
 -ES6 post (class fields being introduced, static and private fields)
*/
/*Check out the arriving_at_the_prototype.js file for a good entry point into OOP in js*/
