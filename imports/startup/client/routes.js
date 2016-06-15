import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import AppContainer from '/imports/ui/common/containers/app';
import NotFound from '/imports/ui/common/components/not-found';
import Home from '/imports/ui/common/components/home';

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ AppContainer }>
        <IndexRoute name="home" component={ Home } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
