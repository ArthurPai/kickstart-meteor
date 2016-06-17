import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { AuthService } from '/imports/modules/accounts/libs/auth_service';

import Profile from '../pages/profile.jsx';

export const composer = (props, onData) => {
  const user = Meteor.user();

  if (AuthService.loggedIn() && user) {
    onData(null, { user });
  }
};

export default composeWithTracker(composer)(Profile);
