"use strict";
class Student {
    constructor(firstName, lastName, year) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = year;
        this.tardies = 0;
        this.scores = [];
    }
    fullName() {
        return `Your full name is ${this.firstName} ${this.lastName}`;
    }
    markLate() {
        this.tardies += 1;
        if (this.tardies >= 3)
            return `You are Expelled!!`;
        return `${this.firstName} ${this.lastName} han been late ${this.tardies} times`;
    }
    addScores(score) {
        this.scores.push(score);
        return this.scores;
    }
    calculateAverage() {
        return (this.scores.reduce((acc, cur) => {
            return acc + cur;
        }, 0) / this.scores.length);
    }
    static EnrollStudents(...student) {
        return `Enrolling Students`;
    }
}
const student = new Student("goeun", "park", 3);
// Student.EnrollStudents([new Student("mak", "nun", 3)]);
console.log(student.markLate());
console.log(student.markLate());
console.log(student.markLate());
console.log(student.addScores(80));
console.log(student.addScores(75));
console.log(student.addScores(95));
console.log(student.calculateAverage());
