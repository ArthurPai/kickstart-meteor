/* eslint-disable consistent-return, array-callback-return */

import React from 'react';
import PageItem from './pageItem.jsx';
import { i18n } from '/imports/libs/i18n';

class Pagination extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      InputPage: 1,
    };
  }

  moveToFirstPage() {
    this.props.callbackParentPage(1);
  }

  moveToLastPage() {
    this.props.callbackParentPage(this.props.totalPage);
  }

  hasPrevPage() {
    return this.props.page > 1;
  }

  moveToPrevPage() {
    if (this.hasPrevPage()) {
      this.props.callbackParentPage(this.props.page - 1);
    }
  }

  hasNextPage() {
    return this.props.page < this.props.totalPage;
  }

  moveToNextPage() {
    if (this.hasNextPage()) {
      this.props.callbackParentPage(this.props.page + 1);
    }
  }

  moveToPage(page) {
    this.props.callbackParentPage(page);
  }

  isInPageRange(page) {
    return (page >= 1 && page <= this.props.totalPage);
  }

  moveToInputPage() {
    const page = Number(this.state.InputPage);
    if (this.isInPageRange(page)) {
      this.props.callbackParentPage(page);
    }
  }

  changeInputPage(e) {
    let value = Number.parseInt(e.target.value, 10);
    value = Number.isInteger(value) ? value.toString() : '';
    this.setState({ InputPage: value });
  }

  render() {
    const PagesNav = _.range(1, this.props.totalPage + 1).map((idx) => {
      const showPages = idx - this.props.page;
      if (idx === (this.props.totalPage - 1) || idx === this.props.totalPage) {
        return <PageItem key={idx} pageNum={idx} activePage={this.props.page}
                         moveToPage={this.moveToPage.bind(this)} />;
      }
      if (showPages < 2 && showPages > -4) {
        return <PageItem key={idx} pageNum={idx} activePage={this.props.page}
                         moveToPage={this.moveToPage.bind(this)} />;
      }
      if (idx === (this.props.totalPage - 2)) {
        return <li key={idx} className="tunshu-no-border">......</li>;
      }
    });

    const isFirstPage = this.props.page === 1;
    const isLastPage = this.props.page === this.props.totalPage;
    const styles = {
      disabled: {
        cursor: 'not-allowed',
      },
    };

    return (
      <ul className="tunshu-pagination">
        <li><a className="btn page-btn page-btn-link"
               onClick={this.moveToFirstPage.bind(this)}
               disabled={isFirstPage}
               style={ isFirstPage ? styles.disabled : null }>
          {i18n.t('pagination.first_page')}
        </a></li>
        <li><a className="btn page-btn"
               onClick={this.moveToPrevPage.bind(this)}
               disabled={isFirstPage}
               style={ isFirstPage ? styles.disabled : null }>
          <i className="fa fa-angle-left" aria-hidden="true" />
        </a></li>
        {PagesNav}
        <li><a className="btn page-btn"
               onClick={this.moveToNextPage.bind(this)}
               disabled={isLastPage}
               style={ isLastPage ? styles.disabled : null }>
          <i className="fa fa-angle-right" aria-hidden="true" />
        </a></li>
        <li><a className="btn page-btn page-btn-link"
               onClick={this.moveToLastPage.bind(this)}
               disabled={isLastPage}
               style={ isLastPage ? styles.disabled : null }>
          {i18n.t('pagination.last_page')}
        </a></li>
        <li className="tunshu-page-label" />
        <li className="tunshu-page-label">{i18n.t('pagination.jump_page')}</li>
        <li><input type="text" id="InputPage" name="InputPage"
                   min="1" max={this.props.totalPage}
                   value={this.state.InputPage} onChange={this.changeInputPage.bind(this)} /></li>
        <li className="tunshu-page-label">{i18n.t('pagination.page')}</li>
        <li><a className="btn page-btn" onClick={this.moveToInputPage.bind(this)}>
          OK
        </a></li>
      </ul>
    );
  }
}

Pagination.propTypes = {
  page: React.PropTypes.number,
  totalPage: React.PropTypes.number,
  callbackParentPage: React.PropTypes.func,
};

export default Pagination;
