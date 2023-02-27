"use strict";
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.name = n;
        }
    }
    greet(phrase) {
        if (this.name) {
            console.log(`${phrase} ${this.name}`);
        }
        else {
            console.log("Hi!");
        }
    }
}
let user1 = new Person();
console.log(user1);
user1.greet("Hello");
//# sourceMappingURL=interfaces.js.map