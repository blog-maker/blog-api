import { Injectable } from '@nestjs/common';

import * as crypto from 'crypto';

import { randomInt } from '../utils';

@Injectable()
export class PasswordHashService {
  hash(password: string) {
    const iterations = randomInt(500, 1000);
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, iterations, 32, `sha512`)
      .toString(`hex`);

    return {
      salt,
      iterations,
      hash,
    };
  }

  compare(password: string, passwordData: any) {
    const hashToCompare = crypto
      .pbkdf2Sync(
        password,
        passwordData.salt,
        passwordData.iterations,
        32,
        `sha512`
      )
      .toString(`hex`);

    return hashToCompare === passwordData.hash;
  }
}
