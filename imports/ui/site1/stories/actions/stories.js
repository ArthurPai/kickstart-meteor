import { ValidationError } from 'meteor/mdg:validation-error';
import { Stories, insertStory, updateStory, removeStory } from '/imports/modules/stories/index';

export const create = (story, cb) => {
  insertStory.call(story, (error) => {
    if (ValidationError.is(error)) {
      const errors = {};
      error.details.forEach((fieldError) => (
        errors[fieldError.name] = Stories.insertSchema.messageForError(fieldError.type, fieldError.name)));
      Object.assign(error, { errors });
    }

    if (cb) cb(error);
  });
};

export const update = (_id, story, cb) => {
  updateStory.call({ _id, ...story }, (error) => {
    if (ValidationError.is(error)) {
      const errors = {};
      error.details.forEach((fieldError) => (
        errors[fieldError.name] = Stories.updateSchema.messageForError(fieldError.type, fieldError.name)));
      Object.assign(error, { errors });
    }

    if (cb) cb(error);
  });
};

export const remove = (_id, cb) => {
  removeStory.call({ _id }, (error) => {
    if (cb) cb(error);
  });
};
