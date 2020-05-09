export interface EntityBase {
  readonly isActive: boolean;
  readonly customAttributes: [
    {
      name: string;
      value: string;
    }
  ];
  readonly extensionsAttributes: any;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
