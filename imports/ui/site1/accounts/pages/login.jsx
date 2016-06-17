import React from 'react';
import { browserHistory } from 'react-router';
import { AuthService } from '/imports/modules/accounts/libs/auth_service';
import { i18n } from '/imports/libs/i18n';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error_message: null,
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ error_message: null });

    const usernameOrEmail = this.refs.usernameOrEmail.value;
    const password = this.refs.password.value;

    AuthService.login(usernameOrEmail, password, (error) => {
      if (error) {
        this.setState({
          error_message: error.reason,
        });
      } else {
        const { location } = this.props;
        const nextPathname = location.state && location.state.nextPathname;
        if (nextPathname) {
          browserHistory.push(nextPathname);
        } else {
          browserHistory.push(AuthService.homeLink());
        }
      }
    });
  }

  render() {
    const labelClass = 'sr-only form-control-label text-xs-right font-weight-bold';

    return (
      <div className="login-container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <header className="text-xs-center">
            </header>
            <div className="login-frame center-block">
              <form ref="login" className="login-form" onSubmit={ this.onSubmit.bind(this) }>
                <div className="form-group">
                  <label htmlFor="_id" className={labelClass}>{i18n.t('users.username')}</label>
                  <div className="input-group">
                    <div className="input-group-addon"><span className="fa fa-lg fa-user" /></div>
                    <input type="text" id="usernameOrEmail" name="usernameOrEmail"
                           ref="usernameOrEmail"
                           className="form-control"
                           placeholder={i18n.t('users.enterUsernameOrEmail')}
                           minlength={3} />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="_id" className={labelClass}>{i18n.t('users.password')}</label>
                  <div className="input-group">
                    <div className="input-group-addon"><span className="fa fa-lg fa-key" /></div>
                    <input type="password" id="password" name="password"
                           ref="password"
                           className="form-control"
                           placeholder={i18n.t('users.enterPassword')}
                           minlength={AuthService.options.minimumPasswordLength} />
                  </div>
                </div>
                <button type="submit" className="btn btn-lg btn-block btn-primary">{i18n.t('common.login')}</button>
              </form>
              { this.state.error_message ?
                <div className="error-msg text-danger text-xs-center">
                  {this.state.error_message}
                </div> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}


Login.propTypes = {
  location: React.PropTypes.object,
};

export default Login;
