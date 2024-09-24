import { AggregateRoot } from '@nestjs/cqrs';
import { Email, Fullname } from './value';
import { ProfileRegistered } from './event/profile-registred.event';

export class Profile extends AggregateRoot {
  readonly id: string;
  readonly email: Email;
  readonly fullName: Fullname;
  readonly password: string;
  readonly hiredAt: string;

  constructor(
    id: string,
    email: Email,
    fullName: Fullname,
    password: string,
    hiredAt: string,
  ) {
    super();
    this.id = id;
    this.email = email;
    this.fullName = fullName;
    this.password = password;
    this.hiredAt = hiredAt;
  }

  static Register = (
    id: string,
    email: Email,
    fullName: Fullname,
    password: string,
    hiredAt: string,
  ) => {
    const profile = new Profile(id, email, fullName, password, hiredAt);

    profile.apply(new ProfileRegistered(id, email, fullName));

    return profile;
  };

  toString() {
    return `Here is example entity with prop`;
  }
}
