import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class EncryptedService {
  private static readonly SALT_LENGTH = 8;
  private static readonly KEY_LENGTH = 64;

  static async toHash(password: string) {
    const salt = randomBytes(this.SALT_LENGTH).toString('hex');
    const buf = (await scryptAsync(password, salt, this.KEY_LENGTH)) as Buffer;

    return `${buf.toString('hex')}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buf = (await scryptAsync(
      suppliedPassword,
      salt,
      this.KEY_LENGTH,
    )) as Buffer;

    return buf.toString('hex') === hashedPassword;
  }
}
