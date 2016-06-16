import { Meteor } from 'meteor/meteor';
import { i18n } from '/imports/libs/i18n';

if (Meteor.isClient) {
  i18n.setLanguage(i18n.getDefaultLanguage());
}
