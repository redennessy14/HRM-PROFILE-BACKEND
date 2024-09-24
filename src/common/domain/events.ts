export abstract class DomainEvent {
  constructor(
    public readonly name: string,
    public readonly occuredOn: Date = new Date(),
  ) {}

  toString() {
    return `Domain event: ${this.name} occured on: ${this.occuredOn.toISOString()}`;
  }
}
