import { RolesServices } from '/imports/modules/accounts/libs/roles_service';
import '/imports/modules/accounts/configs/accounts';
import '/imports/modules/accounts/configs/profile';

Accounts.validateLoginAttempt((attempt) => {
  if (attempt.error) {
    const reason = attempt.error.reason;
    if (reason === 'User not found' || reason === 'Incorrect password') {
      throw new Meteor.Error(403, 'Login forbidden');
    }
  }

  if (attempt.allowed) {
    if (!RolesServices.isUserRole(attempt.user)) {
      throw new Meteor.Error(403, 'Login forbidden');
    }
  }

  return attempt.allowed;
});
