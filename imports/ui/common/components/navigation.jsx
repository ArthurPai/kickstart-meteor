import React from 'react';
import { IndexLink, Link } from 'react-router';
import { i18n } from '/imports/libs/i18n';

class Navigation extends React.Component {
  renderInfo() {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="nav-link auth-link">
            {i18n.t('common.logout')}
          </Link>
        </li>
      </ul>
    );
  }

  renderLoginLink() {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/" className="auth-link nav-link">
            {i18n.t('common.login')}
          </Link>
        </li>
      </ul>
    );
  }

  renderNavLinks() {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/stories" className="nav-link">{i18n.t('stories.list')}</Link>
        </li>
      </ul>
    );
  }

  renderFeatureLinks() {
    return (
      <ul className="nav navbar-nav">
        <li className="nav-item">
          <Link to="/stories" className="nav-link">{i18n.t('stories.list')}</Link>
        </li>
      </ul>
    );
  }

  renderLinks(isLogin) {
    return isLogin ? this.renderFeatureLinks() : this.renderNavLinks();
  }

  renderAccount(isLogin) {
    return isLogin ? this.renderInfo() : this.renderLoginLink();
  }

  render() {
    const isLogin = false;
    const homeLink = '/';

    return (
      <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
        <IndexLink to={homeLink} className="navbar-brand">
          <img className="logo" src="/images/logo.png" />
        </IndexLink>

        {this.renderLinks(isLogin)}
        {this.renderAccount(isLogin)}
      </nav>
    );
  }
}

export default Navigation;
