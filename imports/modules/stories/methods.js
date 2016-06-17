import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { addDDPRateLimiterRules } from '/imports/libs/ddp';

import { Stories } from '../stories';

const checkExist = (_id) => {
  if (!Stories.findOne(_id)) {
    throw new Meteor.Error('stories.not_found', 'Story not exist!');
  }
};

export const insertStory = new ValidatedMethod({
  name: 'stories.insert',
  validate: Stories.insertSchema.validator({ clean: true }),
  run(story) {
    Stories.insert(story);
  },
});

export const updateStory = new ValidatedMethod({
  name: 'stories.update',
  validate: Stories.updateSchema.validator({ clean: true }),
  run(_story) {
    const { _id, ...story } = _story;
    checkExist(_id);
    Stories.update(_id, { $set: story });
  },
});

export const removeStory = new ValidatedMethod({
  name: 'stories.remove',
  validate: Stories.idSchema.validator(),
  run({ _id }) {
    checkExist(_id);
    Stories.remove(_id);
  },
});

// Get list of all method names
const METHODS = [
  insertStory,
  updateStory,
  removeStory,
].map(method => method.name);

addDDPRateLimiterRules(METHODS);
