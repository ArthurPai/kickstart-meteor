import { composeWithTracker } from 'react-komposer';
import { i18n } from '/imports/libs/i18n';

import Footer from '../components/footer.jsx';

export const composer = (props, onData) => {
  const language = i18n.getLanguage();

  onData(null, { language });
};

export default composeWithTracker(composer)(Footer);
