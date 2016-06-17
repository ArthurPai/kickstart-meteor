import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { addDDPRateLimiterRules } from '/imports/libs/ddp';
import './profile';

export const updateProfile = new ValidatedMethod({
  name: 'users.update.profile',
  validate: Meteor.users.profileSchema.validator(),
  run(profile) {
    const userId = Meteor.userId();
    if (!userId) {
      throw new Meteor.Error('users.unauthenticated', 'Unauthenticated');
    }

    return Meteor.users.update(
      { _id: userId },
      {
        $set: { profile },
      }
    );
  },
});

// Get list of all method names
const METHODS = [
  updateProfile,
].map(method => method.name);

addDDPRateLimiterRules(METHODS);
