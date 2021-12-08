/*---Intro---*/
/*Resource: https://www.youtube.com/watch?v=aAAS9cEuFYI&t=22s&ab_channel=Codesmith
/*This article will walk you through how OOP programming is implemented in JS
by starting with the core concept of trying to pair functionality with pertinent
data, REMEMBER this definition as you read this article. There are many different
ways to accomplish this going in JS, each has their pros and cons and several
will be shown until we arrive at the most popular way to accomplish this goal*/
/*REMEMBER: WE WANT TO PAIR FUNCTIONALITY WITH ITS PERTINENT DATA*/

/*---Object Literal Method---*/
/*The simplest way to combine functionality with data*/
const user1 = {
  name: "Joe",
  score: 3,
  increment: function () {
    user1.score++;
  },
};
user1.increment();
console.log(user1.score); //4
/*The 'user1.increment()' line showcases it perfectly. Our functionality
'increment()' is very clearly associated with its pertinent data 'user1'*/
/*This is different from if we had taken the increment function and seperated
it from the user1 object like below:*/
const user1_ex2 = {
  name: "Joe",
  score: 3,
};
function increment_ex2() {
  user1_ex2.score++;
}
increment_ex2();
console.log(user1_ex2.score); //4
/*Clearly here the functionality (a function that increments the user1_ex2.score property
is seperated from the object)*/

/*---Dot Notation Method---*/
const user2 = {}; //create an empty obj
//add vals to it
user2.name = "Joe";
user2.score = 3;
user2.increment = function () {
  user2.score++;
};
user2.increment();
console.log(user2.score); //4

/*---Object.create method---*/
//Object.create makes an empty object (with some hidden stuff we'll address later)
const user3 = Object.create(null);
user3.name = "Joe";
user3.score = 3;
user3.increment = function () {
  user3.score++;
};
user3.increment();
console.log(user3.score); //4

/*All of the methods shown above accomplish the goal we're looking for.
We want a function to increment a specific user's score and each user has its
own function on it that corresponds with its specific data (in these cases each
function has the data it needs to increment hard coded in).*/

/*The biggest flaw we have here is the repetitiveness. We're hardcoding
an object and a function every time we want to create a new object. If we 
had a 1000 users this would clearly be unsustainable.*/

/*Well, if we have repetitive code, the goto tool for that would be a function!
Lets see if we can create a function that we call when we need a new user and
still adds a function on it that is coupled to the pertinent data (that specific user)*/

/*---Solution 1---*/
function userCreator1(name, score) {
  const newUser = {}; //create an empty obj
  newUser.name = name;
  newUser.score = score;
  newUser.increment = function () {
    newUser.score++;
  };
  return newUser; //return new user obj
}
const user4 = userCreator1("Joe", 3);
user4.increment();
console.log(user4.score); //4
/*This is a great and simple solution. We create an empty object initialize its
properties and methods and then return it. Each time we run this function
the const 'newUser' will have a different reference, so you don't need to worry
about overwriting anything or if two users created with the userCreator function
will somehow be able to increment each other.*/
/*There is one big FLAW here though:
 - Every time we create a new user, we are essentially creating a duplicate
 of the increment function in memory. This function does the same thing on every
 user object and yet if there are thousands of users, there could be thousands
 of copies of that function in memory which is wildly ineffecient*/

/*^^^^^^^^^IMPORTANT ABOVE & BELOW*/

/*How should we go about solving this? Well what if we had an object that stored
our user functions? That would be great, but then aren't we decoupling the functionality
from its data? and isn't that our whole goal? ... 
Thats a good point but we never said our functionality and data needed to be coupled
in memory specifically right? So why don't we put the functionality on an object
in a seperate place in memory, that way we aren't duplicating our functions 
every time we create a new user. However on each user, we will create a special
type of bond that links it to this object. And the interperter will first check
the user for that functionality when its called, if its not there then it follows
the bond to the object thats storing all our functions!*/
/*If you're not convinced just read the example below and see what I mean*/
const functionStore = {
  increment: function () {
    this.score++;
  }, //we'll cover 'this' in a bit
  login: function () {
    console.log("You're logged in");
  },
};
function userCreator(name, score) {
  const newUser = Object.create(functionStore); //creating an empty obj
  newUser.name = name;
  newUser.score = score;
  return newUser; //returning full obj
}
const user5 = userCreator("Joe", 3);
user5.increment();
console.log(user5.score); //4
/*There's a lot going on here so lets walk through it*/
/*Step one*/
/*First we define an object called "functionStore", this is the object we
were talking about earlier that will store all our user functions so we 
don't replicate them in memory*/
/*Step two*/
/*We define the userCreator function. In this userCreator function we do 
what we've always done, create an empty object, assign it values, then return it.
The difference here is in that 'Object.create' line.
  -I said Object.create always creates an empty object right? Regardless of the
  paramaters right? so whats going on here? Well that is still true, with the
  exception of a hidden property called dunder proto, (written as __proto__).
  This __proto__ is essentially set to point to whatever paramater is passed
  to Object.create(param1). This is what creates that bond to the functionStore 
  obj and allows for us to access that functionStore with simple syntax thanks 
  to the JS engine. (as I'll detail later);
/*Step three*/
/*We create a user object using our userCreator function*/
/*Step four*/ //SUPER KEY HERE
/*We call the right functionality on the PERTINENT DATA!!!!*/
user5.increment();
/*If you wanna increment user5, all you need to do is use dot notation.
As simple as that, thus our goal has been accomplished*/
/*But how does the increment function on the functionStore object know which
object score to increment? Essentially JS has a placehold for the object that
we used in the function definition called 'this'. Whenever 'this' is used in a 
method invocation (like whats shown above), JS will set the 'this' keyword to 
reference whatever is on the left of the dot, thus achieving a dynamic reference
to the right user, even though the function increment is only defined once in memory!!*/

/*Lets peek into that hidden property and see if its really there*/
console.log(user5.__proto__); //{increment: <func>, login: <func>}
/*Well I see what looks like the functionStore but are they really pointing to
the same thing? Well lets see*/
console.log(user5.__proto__ === functionStore); //true

/*Now this is a beatiful solution and at the risk of spoiling future info, this is 
basically a homegrown implementation of a constructor function without the "new"
keyword.*/
/*The solution is still a little messy/longwinded though and there is some
redunant info that we'll need to do every time we're calling a function that
returns an object in this manner (userCreator is really a lesser form of whats
called a constructor function). In every constructor function we need to:
 -1. Create an empty obj
 -2. Return that obj

Combine those two repetitions in every single constructor function with the already
longwinded way of writing this common utility and its clear that JS should provide
a more primitive way of handling such a use case. And it turns out it does with the
keyword 'new'

/*Essentially we place the 'new' keyword before we invoke a constructor function (
  a function that creates an object or template like the 'userCreator' function
  we have above). When we invoke a constructor function using 'new' a few things
  will happen for us.

  1. An empty object will already be created (removes one line of code from our constructor function)
  2. that object will be returned at the end of our constructor function (again removes one line)

*/
/*Those things are cool and all and saves us time but now we got some problems,
before we were defining that bond from new user to the 'functionStore' when we created
the object using Object.create(). If we're not creating the object how do we set
the special bond to store our data relevant functionality? Well it turns out JS
will pick that place automatically.

Another prob is that we no longer have a reference to the object if we're not the
ones creating it right? Well JS solves that by giving us a key word within the 
constructor function that will reference the newly created empty object that JS
makes on the backend. What is this keyword? Well its 'this', but a different 'this'
then the one we saw previously.

This 'this' refers to the empty obj that gets created within a constructor function
whenever its invoked with 'new'. The other 'this' refers to the object on the left
hand side of the dot. Remember that these 'this''s are two different things.
*/

/*---Example with 'new' keyword---*/
//naming convention is to name constructor functions in PascalCase
function UserCreator(name, score) {
  //no object creation statement, handled automaticaly cuz of 'new'
  this.name = name;
  this.score = score;
  //no return statement, handled automatically cuz of 'new'
}
const user6 = new UserCreator("Joe", 3);
console.log(user6); //{ name: 'Joe', score: 3 }
/*Now how do make edits and add functions to our 'functionStore' equivalent
that JS picks for us? Well it turns out that __proto__ property is pointing to
an empty obj already. So we could technically do this:*/
user6.__proto__.increment = function () {
  this.score++;
};
user6.increment();
console.log(user6.score); //4;
//That increment function isn't specific to the user6 user either
const user7 = new UserCreator("John", 5);
user7.increment();
console.log(user7.score); //6

/*This is great and we're almost there, there is one problem though. Do we really
want to access the 'functionStore' object (prototype object) via an object instance's
__proto__ property? That feels a bit messy. Well it turns out that all functions
also have a property called 'prototype' which points to the same object as 
__proto__ would if the __proto__ property belongs to an object that was created
via a 'new' constructor function invokation.*/

//See what I mean below
UserCreator.prototype.login = function () {
  console.log(`Congrats ${this.name}, you're logged in!`);
};
user7.login(); //Congrats John, you're logged in
user6.login(); //Congrats Joe, you're logged in

/*This can occur because essentially all 
