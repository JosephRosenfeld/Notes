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
