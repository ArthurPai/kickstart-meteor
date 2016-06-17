import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { i18n } from '/imports/libs/i18n';

import AppContainer from '../pages/app.jsx';

export const composer = (props, onData) => {
  const connected = Meteor.status().connected;
  const language = i18n.getLanguage();

  onData(null, { connected, language });
};

export default composeWithTracker(composer)(AppContainer);
