interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Business Owner'],
  customerRoles: [],
  tenantRoles: ['Business Owner', 'Health Equipment Supplier', 'Personal Trainer', 'Dietician'],
  tenantName: 'Organization',
  applicationName: 'HealthWala',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    'Manage Organization registration',
    'Manage Health Equipment Suppliers',
    'Manage Personal Trainers',
    'Manage Dieticians',
  ],
};
