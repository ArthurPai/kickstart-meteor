import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';

export const addDDPRateLimiterRules = (METHODS) => {
  if (Meteor.isServer) {
    // Only allow 5 operations per connection per second
    DDPRateLimiter.addRule({
      name(name) {
        return (METHODS.indexOf(name) !== -1);
      },
      // Rate limit per connection ID
      connectionId() {
        return true;
      },
    }, 5, 1000);
  }
};
