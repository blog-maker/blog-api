export interface Timestamp {
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

export interface EntityBase extends Timestamp {
  readonly isActive: boolean;
  readonly customAttributes: [
    {
      name: string;
      value: string;
    }
  ];
  readonly extensionsAttributes: any;
}
