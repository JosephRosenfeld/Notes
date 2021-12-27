/*IMPORTANT READ: This notes section is very early on and will be reformatted
at a later date to be more readable, for now its just to jot quick notes and 
store links to articles I found valuable*/

/*A componenent that doesn't modify it's props is called a "pure" component*/

/*Resources
  - The React rendering process and virtual DOM:
    - https://www.youtube.com/watch?v=i793Qm6kv3U&ab_channel=CrossComm%2CInc.
    - https://en.reactjs.org/docs/reconciliation.html
  */
/*Virtual DOM element:
  -Its really just a plain old JS object that looks like the following:*/
/*
const MyComponent = {
    <main>
      <h1 id='title'>Look ma!</h1>
    </main>
  }
  */
/*Translates to this:*/
/*
{
  type: "main",
  key: null,
  ref: null,
  "$$typeof": Symbol(react.element),
  props: {
    children: {
      type: "h1",
      key: null,
      ref: null,
      props: {
        id: "title",
        children: "Look ma!"
      }
    }
  }
}
*/
/*The combination of all these 'elements' is the actual virtual DOM.*/

/*  -Why did React shift from classes to React hooks?
    -https://www.youtube.com/watch?v=eX_L39UvZes&t=271s&ab_channel=uidotdev
*/

/*React need to call 'super' in the constructor?*/
/*Resource:
  -https://overreacted.io/why-do-we-write-super-props/*/
/*This is basically a function of React. When you're using a derived
class in ES6 before the class fields proposal, you needed to use a constructor
function in order to initialize your data like so:*/
class Derived extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property1: "property1",
      property2: "property2",
    };
  }
}
/*In JS you have to call super in the constructor function before you can access
the 'this' keyword. It does this just to make sure that the parent class's
constructor has been called first (JS looking out for u cuz this makes
everything cleaner and much less error prone if you try and access a property
on 'this' later and it doesn't exist because it requires the parent class's
constructor function in order to be initialized). But do we really need to
call super with 'props'?*/
class Derived extends React.Component {
  constructor(props) {
    super(); //forgot to pass props here
    this.state = {
      property1: "property1",
      property2: "property2",
    };
    this.method1 = this.method1.bind(this);
  }

  method1() {
    console.log(this.props); // this will work but why?
  }

  render() {
    return <h1 onClick={this.method1}></h1>;
  }
}
/*This works because even though the parent constructor was never given the 
props to be initialized, React still assigns the object 'props' after the
constructor function is called just to make sure that all components get their
props (3rd party libraries and whatnot, react just wants to make sure that
regardless of the variation, you've got your props).

/*Backend on React*/
// Inside React
class Component {
  constructor(props) {
    this.props = props;
    // ...
  }
}

// Inside React
const instance = new YourComponent(props);
instance.props = props; //(Assigning that instance of your component props)

/*Why did we need to autobind our functions?*/
/*Resources: 
  - https://www.freecodecamp.org/news/this-is-why-we-need-to-bind-event-handlers-in-class-components-in-react-f7ea1a6f93eb/
  */

/*The reason we had to autobind our stuff was because of JS not react*/
/*In JS the 'this' value is often times defined based on how the function
was invoked. For example, this function will have different values for 'this'
with each call*/
var obj = {};
obj.func = function () {
  console.log(this);
};
obj.test(); //obj
var holder = obj.test;
holder(); //global (window object in browser)

/*Seen in a class declaration*/
class MyClass {
  method1() {
    console.log(this);
  }
}

var myInstance = new MyClass();
myInstance.method1(); //myInstance;
var holder = myInstance.method1;
holder(); //global

/*This is a problem especially when 'this' gets used in a callback or as an
event handler or for a third party library because you don't have control
over how your method is going to be invoked. To solve this dilema you need
to bind the function with the correct value for 'this'*/
class MyClass2 {
  constructor() {
    this.method1 = this.method1.bind(this);
  }
  method1() {
    console.log(this);
  }
}
var myInstance = new MyClass2();
myInstance.method1(); //myInstance;
var holder = myInstance.method1;
holder(); //myInstance

/*This can also be solved using class fields and arrow functions because
arrow functions don't define 'this' based on how the function was invoked, but
instead based on how the function is LEXICALLY DEFINED!!*/
class MyClass3 {
  method1 = () => {
    console.log(this);
  };
}
var myInstance = new MyClass3();
myInstance.method1(); //myInstance;
var holder = myInstance.method1;
holder(); //myInstance

/*Should be noted though that this doesn't define the function on the protoype
so it is less memory effecient, but its necessary if you need to define 'this'*/
