import React from 'react';
import { i18n } from '/imports/libs/i18n';

const labelClass = 'col-sm-2 form-control-label text-xs-right font-weight-bold';

const ProfileInfo = ({ user, onEdit }) => (
  <div>
    <header style={{ marginBottom: '15px' }}>
      <div className="btn-group pull-right" role="group">
        <a className="btn btn-primary btn-sm" role="group"
           onClick={onEdit}>{i18n.t('editing.edit')}</a>
      </div>
      <h4>{i18n.t('users.profile_information')}</h4>
    </header>
    <div className="card">
      <div className="card-block">
        <form className="form-horizontal">
          <div className="form-group row">
            <label className={labelClass}>{i18n.t('users.id')}</label>
            <div className="col-sm-10">
              <p className="form-control-static" style={{ paddingLeft: '0.825rem' }}>{user._id}</p>
            </div>
          </div>
          <div className="form-group row">
            <label className={labelClass}>{i18n.t('users.nickname')}</label>
            <div className="col-sm-10">
              <p className="form-control-static" style={{ paddingLeft: '0.825rem', paddingTop: '0.45rem', paddingBottom: '0.5rem' }}>
                {user.profile.nickname}
              </p>
            </div>
          </div>
          <div className="form-group row">
            <label className={labelClass}>{i18n.t('users.language')}</label>
            <div className="col-sm-10">
              <p className="form-control-static" style={{ paddingLeft: '0.65rem' }}>
                {i18n.getLanguageName(user.profile.language)}
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
);

ProfileInfo.propTypes = {
  user: React.PropTypes.object.isRequired,
  onEdit: React.PropTypes.func.isRequired,
};

export default ProfileInfo;
