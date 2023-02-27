import { type } from "os";
import { brotliDecompress } from "zlib";

type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: "Max",
  privileges: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: string, b: number): number;
function add(a: number, b: string): number;
function add(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add("Max", "Colt");
result.split(" ");

const fetchedData = {
  id: "u1",
  name: "Max",
  //   job: { title: "CEO", description: "My own company" },
};

// console.log(fetchedData?.job?.title);

const userInput = "";
const storedData = userInput ?? "DEFAULT";
console.log(storedData);

// type UnknownEmployee = Employee | Admin;

// function printEmployeeInformation(emp: UnknownEmployee) {
//   console.log("Name : " + emp.name);
//   if ("privileges" in emp) {
//     console.log("Privileges : " + emp.privileges);
//   }

//   if ("startDate" in emp) {
//     console.log("startDate : " + emp.startDate);
//   }
// }

// printEmployeeInformation({ name: "Manu", startDate: new Date() });

// class Car {
//   drive() {
//     console.log("Driving...");
//   }
// }

// class Truck {
//   drive() {
//     console.log("Driving a truck....");
//   }

//   loadCargo(amount: number) {
//     console.log("Loading cargo..." + amount);
//   }
// }

// type Vehicle = Car | Truck;

// const v1 = new Car();
// const v2 = new Truck();

// function useVehicle(vehicle: Vehicle) {
//   if (vehicle instanceof Car) {
//   }
//   if (vehicle instanceof Truck) {
//     vehicle.loadCargo(1000);
//   }
// }

// interface Bird {
//   type: "bird";
//   flyingSpeed: number;
// }

// interface Horse {
//   type: "horse";
//   runningSpeed: number;
// }

// type Animal = Bird | Horse;

// function moveAnimal(animal: Animal) {
//   let speed;
//   switch (animal.type) {
//     case "bird":
//       speed = animal.flyingSpeed;
//       break;
//     case "horse":
//       speed = animal.runningSpeed;
//   }
//   console.log("Moving at speed : " + speed);
// }

// interface ErrorContainer {
//   //{email: 'Not a valid email', username: 'Must start with a character!'}
//   //   id: string;
//   [prop: string]: string;
// }

// const errorBag: ErrorContainer = {
//   email: "Not a valid email",
//   username: "Must start with a capital character!",
// };
