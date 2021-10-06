export interface IPerson {
    firstName: string;
    lastName: string;
    age: number;
    getFullName(): string;
}
export class Person implements IPerson {
    public firstName: string;
    public lastName: string;
    public age: number;
    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    getFullName(): string {
        return `${this.firstName} ${this.lastName}`
    }
}

