import React from 'react';

class PageItem extends React.Component {
  onClick() {
    event.preventDefault();
    this.props.moveToPage(this.props.pageNum);
  }

  isActive() {
    return (this.props.pageNum === this.props.activePage) ? 'active' : '';
  }

  render() {
    return (
        <li className={this.isActive()}>
          <a className="btn page-btn" onClick={this.onClick.bind(this)}>{this.props.pageNum}</a>
        </li>
    );
  }
}

PageItem.propTypes = {
  moveToPage: React.PropTypes.func,
  pageNum: React.PropTypes.number,
  activePage: React.PropTypes.number,
};

export default PageItem;
