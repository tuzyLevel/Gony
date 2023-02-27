"use strict";
// const button = document.querySelector("button")!;
// button.addEventListener("click", () => {
//   console.log("Clicked");
// });
class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.employees = [];
    }
    static createEmployee(name) {
        return { name: name };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
Department.fiscalYear = 2020;
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT");
        this.admins = admins;
    }
    describe() { }
}
class AccountingDepartment extends Department {
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
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
        if (this.lastReport)
            return this.lastReport;
        throw new Error("No report found.");
    }
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass in a valid value!");
        }
        this.addReport(value);
    }
    describe() {
        console.log("Accouting Department - ID : ", this.id);
    }
    addEmployee(name) {
        if (name === "Max")
            return;
        this.employees.push(name);
    }
    addReport(text) {
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
//# sourceMappingURL=%08classes.js.map