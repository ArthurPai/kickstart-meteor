import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Stories } from '/imports/modules/stories/index';
import { RolesServices } from '/imports/modules/accounts/libs/roles_service';
import { md5 } from '/imports/libs/utilities';

const users = [
  {
    info: {
      username: '15811111111',
      password: md5('111111'),
      profile: {
        nickname: '小白',
      },
    },
  },
];

for (const user of users) {
  if (!Meteor.users.findOne({ username: user.info.username })) {
    const userId = Accounts.createUser(user.info);

    RolesServices.setUserRole(userId);
  }
}

if (Stories.find().count() === 0) {
  Stories.insert({ name: 'Name 10' });
  Stories.insert({ name: 'Name 20' });
  Stories.insert({ name: 'Name 30' });
  Stories.insert({ name: 'Name 40' });
  Stories.insert({ name: 'Name 50' });
  Stories.insert({ name: 'Name 60' });
  Stories.insert({ name: 'Name 70' });
  Stories.insert({ name: 'Name 80' });
  Stories.insert({ name: 'Name 90' });
  Stories.insert({ name: 'Name 100' });
  Stories.insert({ name: 'Name 200' });
  Stories.insert({ name: 'Name 500' });
  Stories.insert({ name: 'Name 1000' });
  Stories.insert({ name: 'Name 2000' });
}
