import { Stories } from '/imports/modules/stories/index';

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
