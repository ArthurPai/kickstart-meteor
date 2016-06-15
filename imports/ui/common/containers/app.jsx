import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';

import AppContainer from '../pages/app.jsx';

export const composer = (props, onData) => {
  const connected = Meteor.status().connected;

  onData(null, { connected });
};

export default composeWithTracker(composer)(AppContainer);
