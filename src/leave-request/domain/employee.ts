export class Employee {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  static New(id: string) {
    return new Employee(id);
  }
}
