class myClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  bark() {
    console.log("bark");
    console.log(this);
  }

  walk = function () {
    console.log(this);
  };

  jump = () => {
    console.log(this);
  };
}

var meep = new myClass();
console.log(meep);
meep.bark();
meep.walk();
meep.jump();
