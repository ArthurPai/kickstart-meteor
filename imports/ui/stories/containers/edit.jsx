import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import { i18n } from '/imports/libs/i18n';

import { Stories } from '/imports/modules/stories';
import EditStory from '../components/edit.jsx';

export const composer = ({ params }, onData) => {
  const language = i18n.getLanguage();
  const _id = params._id;

  if (Meteor.subscribe('stories.single', { _id }).ready()) {
    const story = Stories.findOne(_id);

    onData(null, { _id, story, language });
  }
};

export default composeWithTracker(composer)(EditStory);
