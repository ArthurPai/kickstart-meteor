import { composeWithTracker } from 'react-komposer';
import { i18n } from '/imports/libs/i18n';

import Navigation from '../components/navigation.jsx';

export const composer = (props, onData) => {
  const language = i18n.getLanguage();

  onData(null, { language });
};

export default composeWithTracker(composer)(Navigation);
