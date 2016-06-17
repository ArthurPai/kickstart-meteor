/* eslint-disable func-names, prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { Stories } from '../../stories';

const sortSchema = new SimpleSchema({
  name: { type: String, allowedValues: [1, -1], optional: true },
  createdAt: { type: Number, allowedValues: [1, -1], optional: true },
});

const dateRangeSchema = new SimpleSchema({
  start: { type: Date },
  end: { type: Date },
});

const querySchema = new SimpleSchema({
  _id: { type: String, optional: true },
  name: { type: String, optional: true },
  createdAt: { type: dateRangeSchema, optional: true },
});

const optionSchema = new SimpleSchema({
  sort: { type: sortSchema, optional: true },
  skip: { type: Number },
  limit: { type: Number },
});

const listSchema = new SimpleSchema({
  query: { type: querySchema },
  option: { type: optionSchema },
});

const searchStories = (subscription, query, option, countName) => {
  const fields = Object.assign({}, Stories.publicFields);
  const defaultQuery = {};
  const defaultOption = {
    sort: { createdAt: -1 },
    fields,
  };

  const final_query = Object.assign({}, defaultQuery);

  Object.keys(query).forEach(key => {
    if (key === '_id' || key === 'name') {
      final_query[key] = new RegExp(query[key], 'i');
    } else if (key === 'createdAt') {
      final_query[key] = {
        $gte: query[key].start,
        $lt: query[key].end,
      };
    } else {
      final_query[key] = query[key];
    }
  });

  const final_option = Object.assign({}, defaultOption, option);
  Counts.publish(subscription, countName, Stories.find(final_query), { noReady: true });
  return Stories.find(final_query, final_option);
};

Meteor.publish('stories.list', function (query, option) {
  listSchema.validate({ query, option });

  return searchStories(this, query, option, 'stories-count');
});

Meteor.publish('stories.single', function ({ _id }) {
  Stories.idSchema.validate({ _id });

  return Stories.find(_id, {
    fields: Stories.publicFields,
  });
});
