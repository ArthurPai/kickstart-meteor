import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { i18n } from '/imports/libs/i18n';

export const Stories = new Mongo.Collection('stories');

Stories.deny({
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

Stories.schema = new SimpleSchema({
  name: {
    type: String,
    label: () => i18n.t('stories.name'),
    max: 50,
  },
  createdAt: {
    type: Date,
    label: () => i18n.t('list.created_time'),
    autoValue() { // eslint-disable-line consistent-return
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset();  // Prevent user from supplying their own value
      }
    },
    denyUpdate: true,
  },
  updatedAt: {
    type: Date,
    label: () => i18n.t('list.updated_time'),
    autoValue() { // eslint-disable-line consistent-return
      if (this.isInsert || this.isUpdate) {
        return new Date;
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      }
    },
  },
});

Stories.idSchema = new SimpleSchema({
  _id: { type: String, regEx: SimpleSchema.RegEx.Id },
});

Stories.insertSchema = Stories.schema.pick([
  'name',
]);

Stories.updateSchema = new SimpleSchema([
  Stories.idSchema,
  Stories.insertSchema,
]);

Stories.attachSchema(Stories.schema);

Stories.publicFields = {
  name: 1,
  createdAt: 1,
  updatedAt: 1,
};
