// 1. Shallow copy: Object.assign() (don't copy Property Descriptor)
{
  function anotherFunction() {}
  var anotherObject = { c: true };
  var anotherArray = [];

  var myObject = {
    a: 2,
    b: anotherObject,
    c: anotherArray,
    d: anotherFunction,
  };

  // Circular Reference -> Infinity Copy Problem
  anotherArray.push(anotherObject, myObject); // anotherArray[0] -> anotherObject, anotherArray[1] -> myObject

  // shallow copy
  var newObj = Object.assign({}, myObject);
  newObj.a; // 2
  newObj.b === anotherObject; // true
  newObj.c === anotherArray; // true
  newObj.d === anotherFunction; // true
}

// 2. Property Discriptor
{
  var myObject = {
    a: 2,
  };

  // description
  Object.getOwnPropertyDescriptor(myObject, "a");

  // Default
  // value: 2
  // writable: true
  // configurable: true
  // enumerable: true

  // define
  var myObject = {};
  Object.defineProperty(myObject, "a", {
    value: 2,
    writable: true, // myObject.a = 3 OK.
    configurable: true, // defineProperty() OK.
    enumerable: true, // express for-in loop
  });
}

// 3. Immutablity
{
  // 1) const prop
  var myObject = {};
  Object.defineProperty(myObject, "FAVORITE_NUMBER", {
    value: 42,
    writable: false,
    configurable: false,
  });

  // 2) Not expending
  var myObject = { a: 2 };
  Object.preventExtensions(myObject);

  // 3) Object.seal()
  // Object.preventExtensions() + props configurable: false

  // 4) Object.freeze()
  // Object.seal() + props writable: false
}

// 4. Getter, Setter(= Accessor Descriptor)
{
  // [[GET]]
  var myObject = { a: 2 };
  myObject.a; // Property Access: [[GET]] Operation -> Success: return value, Failed: return undefined
  myObject.b; /// IndentifierAccess: Reference Error

  // return undefined
  // 1. value: undefined
  // 2. [[GET]] Operation result: undefined

  // [[PUT]]
  // 1. Accessor Discriptor?(= set prop()) -> Yes: Setter Call
  // 2. writable: false ? -> TypeError
  // 3. Setting

  var myObject = {
    get a() {
      return 2;
    },
  };

  Object.defineProperty(myObject, "b", {
    get: function () {
      return this.a * 2;
    },

    enumerable: true,
  });

  myObject.a; // 2
  myObject.b; // 4, Ignore 'writable'
}

// 5. Exist Confirm
{
  var myObject = {
    a: 2,
  };

  // in operator: prototype chain
  "a" in myObject; // true
  "b" in myObject; // false

  myObject.hasOwnProperty("a"); // true
  myObject.hasOwnProperty("b"); // false
}
