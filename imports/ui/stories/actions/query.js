import { browserHistory } from 'react-router';
import { LocalState } from '/imports/libs/local_state';

const queryOptions = {
  _id: '_id',
  name: 'name',
};

LocalState.set('STORIES_QUERY_TYPE', '_id');
LocalState.set('STORIES_QUERY_VALUE', '');

LocalState.set('STORIES_QUERY_CREATED_DATE_START', null);
LocalState.set('STORIES_QUERY_CREATED_DATE_END', null);

export const setQueryDataRange = (start, end) => {
  LocalState.set('STORIES_QUERY_CREATED_DATE_START', start);
  LocalState.set('STORIES_QUERY_CREATED_DATE_END', end);
};

export const setSearchQuery = (type, value) => {
  LocalState.set('STORIES_QUERY_TYPE', type);
  LocalState.set('STORIES_QUERY_VALUE', value);

  browserHistory.replace({
    pathname: '/stories',
    query: { page: 1 },
  });
};

export const clearSearch = () => {
  LocalState.set('STORIES_QUERY_TYPE', null);
  LocalState.set('STORIES_QUERY_VALUE', null);

  browserHistory.replace({
    pathname: '/stories',
    query: { page: 1 },
  });
};

export const getSearchQuery = () => {
  const queryType = LocalState.get('STORIES_QUERY_TYPE');
  const queryValue = LocalState.get('STORIES_QUERY_VALUE');

  const createdStart = LocalState.get('STORIES_QUERY_CREATED_DATE_START');
  const createdEnd = LocalState.get('STORIES_QUERY_CREATED_DATE_END');

  return { queryOptions, queryType, queryValue, createdStart, createdEnd };
};

export const getQuery = () => {
  const query = {};

  const queryType = LocalState.get('STORIES_QUERY_TYPE');
  const queryValue = LocalState.get('STORIES_QUERY_VALUE');
  if (queryValue) {
    const type = queryOptions[queryType];
    query[type] = queryValue;
  }

  const start = LocalState.get('STORIES_QUERY_CREATED_DATE_START');
  const end = LocalState.get('STORIES_QUERY_CREATED_DATE_END');
  if (start && end) {
    query.createdAt = {
      start,
      end,
    };
  }

  return query;
};

export const setSort = (sort) => LocalState.set('STORIES_SORT', sort);

export const getSort = () => LocalState.get('STORIES_SORT');
