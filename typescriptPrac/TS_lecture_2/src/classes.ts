// const button = document.querySelector("button")!;
// button.addEventListener("click", () => {
//   console.log("Clicked");
// });
abstract class Department {
  static fiscalYear = 2020;
  protected employees: string[] = [];

  constructor(protected readonly id: string, public name: string) {}

  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  admins: string[];

  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }

  describe(this: ITDepartment) {}
}

class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;
  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }
  static getInstance() {
    if (AccountingDepartment.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  get mostRecentReport() {
    if (this.lastReport) return this.lastReport;
    throw new Error("No report found.");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }
  describe(this: AccountingDepartment) {
    console.log("Accouting Department - ID : ", this.id);
  }
  addEmployee(name: string): void {
    if (name === "Max") return;
    this.employees.push(name);
  }
  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  getReports() {
    console.log(this.reports);
  }
}
const information = new ITDepartment("d1", ["Max"]);

information.addEmployee("Max");
information.addEmployee("Manu");

information.describe();
information.printEmployeeInformation();

// const informationCopy = { name: "DUMMY", describe: information.describe };

// informationCopy.describe();

const accounting = AccountingDepartment.getInstance();
accounting.mostRecentReport = "new Report";
console.log(accounting.mostRecentReport);
accounting.addReport("Something went wrong!");
accounting.getReports();

console.log(accounting.mostRecentReport);
console.log(Department.fiscalYear);
accounting.describe();

console.log(accounting.name);
