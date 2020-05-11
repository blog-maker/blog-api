import { Document } from 'mongoose';

import { EntityBase } from './base.interface';

export interface User extends Document, EntityBase {
  readonly username: string;
  readonly normalizedUserName: string;
  readonly password: {
    readonly salt: string;
    readonly hash: string;
    readonly iterations: number;
  };
  readonly email: string;
  readonly normalizedEmail: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly phoneNumber: string;
  readonly admin: boolean;
  readonly superuser: boolean;
}
