import React from 'react';
import { i18n } from '/imports/libs/i18n';

class ProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      nickname: '',
      avatar: '',
      language: 1,
    };
  }

  componentWillMount() {
    this.onPropsSetOrChange(this.props);
  }

  onPropsSetOrChange(props) {
    const { user } = props;

    const profile = user.profile
      || {
        _id: '',
        nickname: '',
        avatar: '',
        language: 1,
      };

    this.setState({
      _id: user._id,
      nickname: profile.nickname,
      avatar: profile.avatar,
      language: profile.language,
    });
  }

  errorMessage(field) {
    return this.props.errors && this.props.errors[field];
  }

  errorClass(field) {
    return this.props.errors && !!this.props.errors[field] ? 'has-danger' : '';
  }

  changeNickname(e) {
    this.setState({ nickname: e.target.value });
  }

  changeLanguage(e) {
    this.setState({ language: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit({
      nickname: this.state.nickname,
      avatar: this.state.avatar,
      language: this.state.language,
    });
  }

  onCancel(event) {
    event.preventDefault();
    this.props.onCancel();
  }

  renderLanguageOptions() {
    return i18n.supportedLanguages().map((language) => (
      <option key={language.key} value={[language.key]}>
        {language.label}
      </option>
    ));
  }

  render() {
    const labelClass = 'col-sm-2 form-control-label text-xs-right font-weight-bold';

    return (
      <div>
        <header style={{ marginBottom: '15px' }}>
          <div className="btn-group pull-right" role="group">
            <a className="btn btn-primary btn-sm" role="group"
               style={{ marginRight: '10px', width: '90px' }}
               onClick={this.onSubmit.bind(this)}>{i18n.t('editing.save')}</a>
            <a className="btn btn-secondary btn-sm" role="group"
               style={{ marginLift: '10px', width: '90px' }}
               onClick={this.onCancel.bind(this)}>{i18n.t('editing.cancel')}</a>
          </div>
          <h4>{i18n.t('users.profile_information')}</h4>
        </header>
        <div className="card">
          <div className="card-block">
            <form onSubmit={this.onSubmit.bind(this)} className="form-horizontal">
              <div className="form-group row">
                <label htmlFor="_id" className="col-sm-2 form-control-label text-xs-right font-weight-bold">
                  {i18n.t('users.id')}
                </label>
                <div className="col-sm-10">
                  <p type="text" id="_id" name="_id"
                     className="form-control-static" style={{ paddingLeft: '0.825rem' }}>
                    {this.state._id}
                  </p>
                </div>
              </div>
              <div className={`form-group row ${this.errorClass('nickname')}`}>
                <label htmlFor="nickname" className={labelClass}>
                  {i18n.t('users.nickname')}
                </label>
                <div className="col-sm-4">
                  <input type="text" id="nickname" name="nickname"
                         className="form-control" style={{ minWidth: '218px' }}
                         value={this.state.nickname}
                         onChange={this.changeNickname.bind(this)} />
                </div>
                <div className="col-sm-6 form-control-label">
                  <span className="text-danger">{this.errorMessage('nickname')}</span>
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="language" className={labelClass}>
                  {i18n.t('users.language')}
                </label>
                <div className="col-sm-4" style={{ paddingTop: '0.45rem' }}>
                  <select id="language" name="language"
                          className="form-control" style={{ minWidth: '218px' }}
                          value={this.state.language}
                          onChange={this.changeLanguage.bind(this)}>
                    {this.renderLanguageOptions()}
                  </select>
                </div>
                <div className="col-sm-6 form-control-label">
                  <span className="text-danger">{this.errorMessage('language')}</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProfileForm.propTypes = {
  user: React.PropTypes.object.isRequired,
  errors: React.PropTypes.object,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

export default ProfileForm;
