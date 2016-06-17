import { Meteor } from 'meteor/meteor';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { composeWithTracker } from 'react-komposer';
import amplifyStore from 'amplify-store';
import { i18n } from '/imports/libs/i18n';

import { Stories } from '/imports/modules/stories';
import StoriesList from '../components/list.jsx';
import { getQuery, getSort } from '../actions';

export const composer = ({ location }, onData) => {
  const language = i18n.getLanguage();
  const limit = 10;
  const current_page = location.query.page ? Math.max(Number(location.query.page), 1) : amplifyStore('STORIES_PAGE');
  const page = current_page || 1;
  const skip = (page - 1) * limit;

  const query = getQuery();
  const sort = getSort();

  const option = { sort, skip, limit };

  if (Meteor.subscribe('stories.list', query, option).ready()) {
    const stories = Stories.find({}, { sort: { createdAt: -1 } }).fetch();
    const totalCount = Counts.get('stories-count');
    const totalPage = Math.ceil(totalCount / 10);
    amplifyStore('STORIES_PAGE', page);

    onData(null, { stories, sort, page, limit, totalPage, language });
  }
};

export default composeWithTracker(composer)(StoriesList);
