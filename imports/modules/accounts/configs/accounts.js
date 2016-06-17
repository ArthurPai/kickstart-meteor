import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

Accounts.config({
  sendVerificationEmail: false,
  forbidClientAccountCreation: true,
});

// Deny all client-side updates to user documents
Meteor.users.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});
