import { Injectable } from '@nestjs/common';
import { hash, verify } from 'argon2';
import * as generatePassword from 'generate-password';

@Injectable()
export class PasswordManagerService {
  async generate(): Promise<string> {
    return generatePassword.generate({
      length: 6,
      numbers: true,
      symbols: false,
      uppercase: true,
      excludeSimilarCharacters: false,
    });
  }

  async hash(plainPassword: string): Promise<string> {
    return hash(plainPassword);
  }

  async verify(
    hashedPassword: string,
    plainPassword: string,
  ): Promise<boolean> {
    return verify(hashedPassword, plainPassword);
  }
}
