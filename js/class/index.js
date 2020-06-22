// Mixin
// 1. Explcit Mixin
{
  function mixin(sourceObj, targetObj) {
    for (var key in sourceObj) {
      if (!(key in targetObj)) {
        targetObj[key] = sourceObj[key];
      }
    }

    return targetObj;
  }

  var Vehicle = {
    engines: 1,
    ignition: function () {
      console.log("Engine On");
    },
    drive: function (value = "") {
      this.ignition();
      console.log(`Go ahead ${value}`);
    },
  };

  var Car = mixin(Vehicle, {
    wheels: 4,
    drive: function () {
      Vehicle.drive.call(this, "Car"); // Context this binding
      console.log(this.wheels + " wheels");
    },
  });

  console.log(Vehicle.drive(), Car.drive());
}
