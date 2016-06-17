import React from 'react';
import { Link } from 'react-router';
import { i18n } from '/imports/libs/i18n';
import { formatDateTime } from '/imports/libs/utilities';

const styles = {
  btn: {
    marginLeft: 5,
    marginRight: 5,
  },
};

const StoreItem = ({ number, story, onRemove }) => (
  <tr>
    <td>
      <Link to={`/stories/edit/${story._id}`}
            className="btn btn-warning btn-sm" style={styles.btn}>
        {i18n.t('editing.edit')}
      </Link>
      <a onClick={() => onRemove(story._id)}
         className="btn btn-danger btn-sm" style={styles.btn}>
        {i18n.t('editing.remove')}
      </a>
    </td>
    <td>{number}</td>
    <td>{story._id}</td>
    <td>{story.name}</td>
    <td>{formatDateTime(story.createdAt)}</td>
    <td>{formatDateTime(story.updatedAt)}</td>
  </tr>
);

StoreItem.propTypes = {
  number: React.PropTypes.number,
  story: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};

export default StoreItem;
