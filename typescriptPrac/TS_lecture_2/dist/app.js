"use strict";
// const names: Array<string> = ["Max", "Manuel"]; // string[]
// const promise = new Promise<string>((resolve, reject) => {
//   setTimeout(() => {
//     resolve("This is done");
//   }, 2000);
// });
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
const mergedObj_1 = merge({ name: "Max" }, { age: 30 });
const mergedObj_2 = merge({ name: "Max", hobbies: ["Sports"] }, { age: 30 });
console.log(mergedObj_1.age);
function countAndDescribe(element) {
    let descriptionText = "Got no value.";
    if (element.length > 0) {
        descriptionText = `Got ${element.length} elements`;
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("Hi there!"));
function extractAndConvert(obj, key) {
    return "Value " + obj[key];
}
extractAndConvert({ name: "Max" }, "name");
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem("Mx");
textStorage.addItem("Max");
console.log(textStorage.getItems());
function createCourseGoal(title, description, completeUntil) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = completeUntil;
    return courseGoal;
}
const names = ["Max", "Anna"];
names.push("Manu");
names.pop();
//# sourceMappingURL=app.js.map