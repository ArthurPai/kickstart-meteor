import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import { i18n } from '/imports/libs/i18n';
import { md5 } from '/imports/libs/utilities';

export const AuthService = {
  options: {
    homePath: '',
    emailRegex: /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    phoneRegex: /^(13[0-9]|14[57]|15[012356789]|17[0678]|18[0-9])[0-9]{8}$/,
    minimumPasswordLength: 6,
  },

  isValidateUsername(username) {
    return !!username;
  },

  isValidateEmail(email) {
    return this.options.emailRegex.test(email);
  },

  isValidatePhone(phone) {
    return this.options.phoneRegex.test(phone);
  },

  isValidatePassword(password) {
    return password.length >= this.options.minimumPasswordLength;
  },

  login(usernameOrEmail, password, callback) {
    if (!this.isValidateUsername(usernameOrEmail)) {
      return callback && callback(new Meteor.Error(
        'error.accounts.usernameRequired',
        i18n.t('error.accounts.usernameRequired')
      ));
    }

    if (usernameOrEmail.indexOf('@') === -1) {
      if (!this.isValidatePhone(usernameOrEmail)) {
        return callback && callback(new Meteor.Error(
          'error.accounts.Invalid phone',
          i18n.t('error.accounts.Invalid phone')
        ));
      }
    } else {
      if (!this.isValidateEmail(usernameOrEmail)) {
        return callback && callback(new Meteor.Error(
          'error.accounts.Invalid email',
          i18n.t('error.accounts.Invalid email')));
      }
    }

    if (!this.isValidatePassword(password)) {
      return callback && callback(new Meteor.Error(
        'error.accounts.minChar',
        i18n.t('error.accounts.minChar', { length: this.options.minimumPasswordLength })
      ));
    }

    return Meteor.loginWithPassword(usernameOrEmail, md5(password), (err) => {
      if (err) {
        callback && callback(new Meteor.Error( // eslint-disable-line no-unused-expressions
          'error.accounts.Incorrect username or password',
          i18n.t('error.accounts.Incorrect username or password')
        ));
      } else {
        i18n.setLanguage(i18n.getCurrentUserLanguage());
        callback && callback(); // eslint-disable-line no-unused-expressions
      }
    });
  },

  logout() {
    Meteor.logout(() => {
      i18n.setLanguage(i18n.getDefaultLanguage());
      browserHistory.push('/');
    });
  },

  validateProfile(_profile, options) {
    const profile = _.extend({}, _profile);
    const context = Meteor.users.profileValidationContext;

    if (context.validate(profile, options)) return null;

    return context.invalidKeys().map((error) => (
      Object.assign({ message: context.keyErrorMessage(error.name) }, error)
    ));
  },

  loggedIn() {
    return Meteor.loggingIn() || !!Meteor.userId();
  },

  requireLogin() {
    return !Meteor.loggingIn() && !Meteor.userId();
  },

  setHomePath(path) {
    this.options.homePath = path;
  },

  homeLink() {
    return this.loggedIn() ? this.options.homePath : '/';
  },
};
