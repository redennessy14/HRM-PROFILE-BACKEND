export class Email {
  private readonly email: string;

  constructor(email: string) {
    this.email = email;
  }

  get domain(): string {
    const email = this.email.split('@');
    return `@${email[1]}`;
  }

  get username(): string {
    const username = this.email.split('@');
    return username[0];
  }

  equals(other: Email): boolean {
    if (this === other) return true;
    if (!(other instanceof Email)) return false;
    return this.email === other.email;
  }

  toString() {
    return `${this.email}`;
  }
}
