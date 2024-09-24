export class Fullname {
  readonly firstName: string;
  readonly lastName: string;

  constructor(firstName: string, lastName: string) {
    if (
      !firstName ||
      !lastName ||
      firstName.length < 2 ||
      lastName.length < 2
    ) {
      throw new Error('Имя и фамилия должны содержать не менее двух символов');
    }
    this.firstName = firstName;
    this.lastName = lastName;
  }

  toString() {
    return `Fullname: ${this.firstName} ${this.lastName}`;
  }
}
