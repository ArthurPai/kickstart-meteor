import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { i18n } from '/imports/libs/i18n';

const profileSchema = new SimpleSchema({
  nickname: {
    type: String,
    label: () => i18n.t('users.nickname'),
    max: 20,
    optional: true,
  },
  avatar: {
    type: String,
    label: () => i18n.t('users.avatar'),
    optional: true,
  },
  language: {
    type: String,
    label: () => i18n.t('users.language'),
    autoValue() {
      return 'zh-CN';
    },
  },
});

Meteor.users.profileSchema = profileSchema;
Meteor.users.profileValidationContext = profileSchema.namedContext('updateUserProfile');
