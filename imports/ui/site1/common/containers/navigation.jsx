import { composeWithTracker } from 'react-komposer';
import { AuthService } from '/imports/modules/accounts/libs/auth_service';
import { i18n } from '/imports/libs/i18n';

import Navigation from '../components/navigation.jsx';

export const composer = (props, onData) => {
  const isLogin = AuthService.loggedIn();
  const user = Meteor.user();
  const homeLink = AuthService.homeLink();
  const language = i18n.getLanguage();

  onData(null, { isLogin, user, homeLink, language });
};

export default composeWithTracker(composer)(Navigation);
