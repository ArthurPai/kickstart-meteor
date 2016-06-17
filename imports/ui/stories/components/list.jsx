import React from 'react';
import { Link, browserHistory } from 'react-router';
import moment from 'moment';
import Alert from 'react-s-alert';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import { i18n } from '/imports/libs/i18n';
import { DateRangePickerLocale } from '/imports/libs/utilities';

import { remove } from '../actions/stories';
import { getSearchQuery, setSearchQuery, setQueryDataRange } from '../actions/query';

import Pagination from '/imports/ui/common/components/pagination.jsx';
import ConfirmModal from '/imports/ui/common/components/confirm-modal.jsx';
import StoryItem from './item.jsx';

class StoriesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      remove_id: null,
      modalIsOpen: false,
    };
  }

  changeSearchType(type) {
    const { queryValue } = getSearchQuery();
    setSearchQuery(type, queryValue);
  }

  changeSearch(e) {
    const { queryType } = getSearchQuery();
    setSearchQuery(queryType, e.target.value);
  }

  changeDataRange(event, picker) {
    if (picker.startDate && picker.endDate) {
      setQueryDataRange(picker.startDate.toDate(), picker.endDate.toDate());
    } else {
      setQueryDataRange(null, null);
    }
  }

  clearDataRange() {
    setQueryDataRange(null, null);
  }

  selectPage(page) {
    browserHistory.push(`/stories?page=${page}`);
  }

  onRemove(storyId) {
    this.setState({
      remove_id: storyId,
      modalIsOpen: true,
    });
  }

  onCancel() {
    this.setState({
      remove_id: null,
      modalIsOpen: false,
    });
  }

  onRemoved(error) {
    if (error) {
      Alert.error(i18n.t(err.error));
    } else {
      return Alert.success(i18n.t('editing.remove_success'), { onRouteClose: false });
    }
  }

  onConfirm() {
    this.setState({
      remove_id: null,
      modalIsOpen: false,
    });
    remove(this.state.remove_id, this.onRemoved);
  }

  renderSearchQuery() {
    const { queryOptions, queryType, queryValue } = getSearchQuery();

    const options = Object.keys(queryOptions).map((key) => (
      <li key={key} className="dropdown-item"
          onClick={() => this.changeSearchType(key)}>
        {i18n.t(`stories.${key}`)}
      </li>
    ));

    return (
      <div className="input-group" style={{ width: 'auto' }}>
        <div className="input-group-btn">
          <button type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown"
                  aria-haspopup="true" aria-expanded="false">
            {i18n.t(`stories.${queryType}`)}
          </button>
          <ul className="dropdown-menu">
            {options}
          </ul>
        </div>
        <input className="form-control" id="search" name="search"
               style={{ width: 234, minWidth: 234 }}
               value={queryValue}
               placeholder={i18n.t('list.enterSearch')}
               onChange={this.changeSearch.bind(this)} />
      </div>
    );
  }

  renderDateRangePicker() {
    const { createdStart, createdEnd } = getSearchQuery();

    let dates = {};
    let label = i18n.t('list.selectDateRange');
    if (createdStart && createdEnd) {
      const startDate = moment(createdStart);
      const endDate = moment(createdEnd);
      dates = { startDate, endDate };
      if (startDate === endDate) {
        label = startDate.format('YYYY-MM-DD');
      } else {
        label = `${startDate.format('YYYY-MM-DD')} - ${endDate.format('YYYY-MM-DD')}`;
      }
    }

    return (
      <DateRangePicker locale={DateRangePickerLocale} {...dates}
                       autoUpdateInput={false}
                       onApply={this.changeDataRange.bind(this)}
                       onCancel={this.clearDataRange.bind(this)}>
        <div className="selected-date-range-btn">
          <div className="pull-left">
            <i className="fa fa-calendar" aria-hidden="true" />
          </div>
          <div className="pull-right dropdown-toggle">
            <span>{label}</span>
          </div>
        </div>
      </DateRangePicker>
    );
  }

  renderStories() {
    const { page, limit, stories } = this.props;

    if (stories.length === 0) {
      return (
        <div className="alert alert-info" role="alert">
          {i18n.t('stories.list_empty')}
        </div>
      );
    }

    const start = (page - 1) * limit + 1;
    const storiesList = stories.map((story, number) => (
      <StoryItem number={start + number}
                 key={story._id}
                 story={story}
                 onRemove={this.onRemove.bind(this)} />
    ));

    return (
      <div className="card table-card">
        <div className="table-responsive">
          <table className="table table-hover table-bordered">
            <thead>
            <tr>
              <th className="text-xs-center edit-field-2">{i18n.t('editing.edit')}</th>
              <th className="text-xs-center serial">{i18n.t('list.serial')}</th>
              <th className="text-xs-center id-field">{i18n.t('list.id')}</th>
              <th className="text-xs-center">{i18n.t('stories.name')}</th>
              <th className="text-xs-center time-field">{i18n.t('list.created_time')}</th>
              <th className="text-xs-center time-field">{i18n.t('list.updated_time')}</th>
            </tr>
            </thead>
            <tbody className="text-xs-center">
            {storiesList}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  renderPagination() {
    return (this.props.totalPage > 0)
      ? <Pagination callbackParentPage={this.selectPage.bind(this)}
                    page={this.props.page}
                    totalPage={this.props.totalPage} />
      : null;
  }

  render() {
    return (
      <div>
        <header className="page-header">
          <div className="form-inline">
            <div className="pull-right">
              <div className="form-group">
                {this.renderSearchQuery()}
              </div>
              <div className="form-group">
                {this.renderDateRangePicker()}
              </div>
              <div className="form-group">
                <Link to="/stories/new" className="btn btn-primary" style={{ marginLeft: 5, marginRight: 5 }}>
                  <i className="fa fa-plus" aria-hidden="true" /> {i18n.t('editing.add')}
                </Link>
              </div>
            </div>
          </div>
          <h3>{i18n.t('stories.list')}</h3>
        </header>
        {this.renderStories()}
        {this.renderPagination()}
        <ConfirmModal modalIsOpen={this.state.modalIsOpen} icon="warn"
                      title={i18n.t('stories.confirm_remove')}
                      confirmText={i18n.t('confirm.ok')}
                      cancelText={i18n.t('confirm.cancel')}
                      onConfirm={this.onConfirm.bind(this)}
                      onCancel={this.onCancel.bind(this)} />
      </div>
    );
  }
}

StoriesList.propTypes = {
  stories: React.PropTypes.array,
  page: React.PropTypes.number,
  limit: React.PropTypes.number,
  totalPage: React.PropTypes.number,
};

export default StoriesList;
