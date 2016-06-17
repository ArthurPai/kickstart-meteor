import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { AuthService } from '/imports/modules/accounts/libs/auth_service';
import { i18n } from '/imports/libs/i18n';

import AppContainer from '/imports/ui/site1/common/containers/app';
import NotFound from '/imports/ui/site1/common/components/not-found';
import Home from '/imports/ui/site1/common/containers/home';
import StoriesList from '/imports/ui/site1/stories/containers/list';
import NewStory from '/imports/ui/site1/stories/containers/new';
import EditStory from '/imports/ui/site1/stories/containers/edit';
import Login from '/imports/ui/site1/accounts/containers/login.jsx';
import Profile from '/imports/ui/site1/accounts/containers/profile.jsx';

const requireAuth = (nextState, replaceState) => {
  if (AuthService.requireLogin()) {
    Alert.warning(i18n.t('error.unauthenticated'));

    replaceState({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

const redirectToHome = (nextState, replaceState) => {
  if (AuthService.loggedIn()) {
    replaceState({ pathname: AuthService.homeLink() });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ AppContainer }>
        <IndexRoute name="home" component={ Home } onEnter={ redirectToHome } />
        <Route path="/stories" component={ StoriesList } onEnter={ requireAuth } />
        <Route path="stories/new" component={ NewStory } onEnter={ requireAuth } />
        <Route path="stories/edit/:_id" component={ EditStory } onEnter={ requireAuth } />
        <Route name="login" path="/login" component={ Login } onEnter={ redirectToHome } />
        <Route name="profile" path="/profile" component={ Profile } onEnter={ requireAuth } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
