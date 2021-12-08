//Global variable
/*when a variable is created without a declaration key word it isn't hoisted and only
gets assigned a value when the interpreter runs into it*/
//console.log(name); //name is not defined
name = "John";

/* a variable is also global when defined with "var" if its in the global scope (aka
  they create objects on the global window object) */
var nameTest = "john";


/*When declared using "var" key word the variable is scoped to its current execution
context. This means global if not within a function. And a function if defined within
a function*/
var name1 = "john";

/*variables defined with var are also hoisted to the top of their scope, however only the 
declaration is hoisted, not the initialization so you will still get an error*/
console.log(name2); //No reference error just console.logs undefined
var name2 = "jimmy";

/*this behavior isn't seen with let or const, they will still hoist the variable
however it isn't initialized to undefined so the interpreter won't silently move along
and an error is still thrown*/
//console.log(constVar); //can not access 'constVar' before initialization
const constVar = "johnny";

//console.log(letVar); //cannot access 'letVar' before initialization
let letVar = "timmy";

/*however one difference between const and let is that let will still initialize it 
to undefined it nothing else is assigned and this can still cause some silent errors*/
let letVar2;
console.log(letVar2); //console.logs undefined
letVar2 = "whimmy";

const constVar2; //Missing initializer in const declaration
console.log(constVar2);
constVar2 = "whippy";
