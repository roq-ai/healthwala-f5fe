const mapping: Record<string, string> = {
  dieticians: 'dietician',
  'health-equipments': 'health_equipment',
  organizations: 'organization',
  'personal-trainers': 'personal_trainer',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
