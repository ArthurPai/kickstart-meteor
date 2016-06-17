import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '/imports/ui/site1/common/containers/app';
import NotFound from '/imports/ui/site1/common/components/not-found';
import Home from '/imports/ui/site1/common/containers/home';
import StoriesList from '/imports/ui/site1/stories/containers/list';
import NewStory from '/imports/ui/site1/stories/containers/new';
import EditStory from '/imports/ui/site1/stories/containers/edit';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ AppContainer }>
        <IndexRoute name="home" component={ Home } />
        <Route path="/stories" component={ StoriesList } />
        <Route path="stories/new" component={ NewStory } />
        <Route path="stories/edit/:_id" component={ EditStory } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
