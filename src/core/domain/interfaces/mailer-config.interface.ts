import { Document } from 'mongoose';

import { Timestamp } from './base.interface';

export interface MailerConfig extends Document, Timestamp {
  readonly host: string;
  readonly port: number;
  readonly secure: boolean;
  readonly auth: {
    readonly user: string;
    readonly pass: string;
  };
  readonly sender: {
    readonly name: string;
    readonly email: string;
  };
}
