import { Accounts } from 'meteor/accounts-base';

export const setProfile = (options, user) => {
  const userData = Object.assign({}, user);
  userData.profile = Object.assign(
    {
      nickname: '',
      avatar: '',
      language: 'zh-CN',
    },
    options.profile
  );

  userData.signupAt = new Date();
  userData.last_login_time = new Date();

  return userData;
};

Accounts.onCreateUser((options, user) => (
  setProfile(options, user)
));
