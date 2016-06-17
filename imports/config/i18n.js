import { Meteor } from 'meteor/meteor';
import { i18n } from '/imports/libs/i18n';

if (Meteor.isClient) {
  Meteor.startup(() => i18n.setupSimpleSchema());

  i18n.setLanguage(i18n.getDefaultLanguage());
}
