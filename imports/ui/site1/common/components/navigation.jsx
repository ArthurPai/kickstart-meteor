import React from 'react';
import { IndexLink, Link } from 'react-router';
import { AuthService } from '/imports/modules/accounts/libs/auth_service';
import { i18n } from '/imports/libs/i18n';

class Navigation extends React.Component {
  renderInfo() {
    const { user } = this.props;
    const nickname = user && user.profile && user.profile.nickname;
    const username = user && user.username;

    return (
      <ul className="nav navbar-nav pull-xs-right">
        <li className="nav-item">
          <Link to="/profile"
                className="nav-link profile-link text-capitalize"
                activeClassName="active">
            {nickname || username}
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/logout" className="nav-link auth-link"
                onClick={() => AuthService.logout()}>
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
          <Link to="/login" className="auth-link nav-link">
            {i18n.t('common.login')}
          </Link>
        </li>
      </ul>
    );
  }

  renderNavLinks() {
    return (
      <ul className="nav navbar-nav">
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

  renderLinks() {
    return this.props.isLogin ? this.renderFeatureLinks() : this.renderNavLinks();
  }

  renderAccount() {
    return this.props.isLogin ? this.renderInfo() : this.renderLoginLink();
  }

  render() {
    return (
      <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
        <IndexLink to={this.props.homeLink} className="navbar-brand">
          <img className="logo" src="/images/logo.png" />
        </IndexLink>

        {this.renderLinks()}
        {this.renderAccount()}
      </nav>
    );
  }
}

Navigation.propTypes = {
  isLogin: React.PropTypes.bool.isRequired,
  user: React.PropTypes.object,
  homeLink: React.PropTypes.string,
};

export default Navigation;
