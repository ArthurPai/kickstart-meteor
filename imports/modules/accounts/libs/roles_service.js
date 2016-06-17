import { Roles } from 'meteor/alanning:roles';

const ROLES = {
  GUEST: 'guest',
  PLAYER: 'player',
  ADMIN: 'admin',
  MANAGER: 'manager',
};

const GROUPS = {
  NORMAL: {
    NAME: 'NORMAL',
    MEMBER: [ROLES.PLAYER, ROLES.GUEST],
  },
  TUNSHU: {
    NAME: 'ADMIN',
    MEMBER: [ROLES.ADMIN, ROLES.MANAGER],
  },
  VENDORS: {
    NAME: 'VENDORS',
    MEMBER: [ROLES.ADMIN],
  },
};

export const RolesServices = {
  ROLES,
  GROUPS,

  isUserRole(user) {
    return Roles.userIsInRole(user, [ROLES.PLAYER], GROUPS.NORMAL.NAME);
  },

  setUserRole(user) {
    return Roles.setUserRoles(user, [ROLES.PLAYER], GROUPS.NORMAL.NAME);
  },
};
