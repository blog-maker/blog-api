export interface EntityBase {
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
