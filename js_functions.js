/*---General---*/
/*Remember in the background the JS engine is seperating declarations and assignments
so although you do it in one line, the JS engine sees it as two lines*/
/*All variable and function declarations are automatically hoisted to the top of 
their scope*/
/*However in contrast, an undeclared variable is undefined up until its executed.*/

/*---Function Declarations---*/
funcDeclaration(); //will console log just fine because function declarations are hoisted
function funcDeclaration() {
  console.log("funcDeclaration");
}

/*---Function Expressions---*/
/*variable declarations are automatically hoisted, but the assignment isn't 
so in this case the funcExpression can't be called above it's declaration
anonymous function expression */
//funcExpression(); //TypeError: funcExpression is not a function
var funcExpression = function () {
  console.log("funcExpression");
};
funcExpression(); // Console logs just fine

//named function expression
//One of the benefits of named function expressions is that if there
//is an error, the stack trace will have the name of the function
//making it easier to find the source of the error
var funcNamedExpression = function myFunction() {
  //statements
  console.log(jimmy); //intentional reference error to show stack trace
};
//funcNamedExpression();
/*ReferenceError: jimmy is not defined
  at myFunction
  at Object.<anonymous>
*/

//Arrow Functions
//arrow functions have a lexically bound "this"
var arrow = () => {
  //statements
};

/*If a statement involves a function and it doesn't mention the key word "function"
then its a function expression*/

//All undeclared variables are automatically global in scope

//Scope
/* if you declare a variable inside func1 & then call func2 from within func1
& func2 is defined using that var but that var wasn't declared inside the lexical
scope of func1 then func2 won't have access to it. (scope doesn't go across the 
call stack);*/
//ex:
function func1() {
  var name = "John";
  func2();
}
function func2() {
  name += " Some Last Name"; //ReferenceError: name is not defined
  console.log(name);
}
//func1();

/*however, if the variable name was instead undeclared, it will automaticaly
join the global scope and therefore be available for use within func2*/
function func1() {
  name = "john"; //no var declaration
  func2();
}
function func2() {
  console.log(name); //can access the variable just fine
}
func1();

//Function Closures

//Function
