import React from 'react';
import Alert from 'react-s-alert';

import ProfileInfo from '../components/_info.jsx';
import ProfileForm from '../components/_form.jsx';
import { AuthService } from '/imports/modules/accounts/libs/auth_service';
import { i18n } from '/imports/libs/i18n';
import { updateProfile } from '/imports/modules/accounts/methods';

class Profile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editInfo: false,
      errors: null,
    };
  }

  onEdit() {
    this.setState({ editInfo: true });
  }

  onSubmit(profile) {
    const invalidKeys = AuthService.validateProfile(profile);

    if (invalidKeys && invalidKeys.length > 0) {
      const errors = {};
      invalidKeys.forEach((error) => {
        errors[error.name] = error.message;
      });

      this.setState({ errors });
      return;
    }

    this.setState({ errors: null });

    updateProfile.call(profile, (error) => {
      if (error) {
        Alert.error(i18n.t(error.error));
      } else {
        i18n.setLanguage(profile.language);
        Alert.success(i18n.t('users.update_profile_success', { lng: profile.language }), { onRouteClose: false });
        this.setState({ editInfo: false });
      }
    });
  }

  onCancel() {
    this.setState({ editInfo: false });
  }

  renderProfileInfo() {
    const { user } = this.props;

    return !this.state.editInfo
      ? <ProfileInfo user={user}
                     onEdit={this.onEdit.bind(this)} />
      : <ProfileForm user={user}
                     errors={this.state.errors}
                     onSubmit={this.onSubmit.bind(this)}
                     onCancel={this.onCancel.bind(this)} />;
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
          {this.renderProfileInfo()}
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  user: React.PropTypes.object.isRequired,
};

export default Profile;
