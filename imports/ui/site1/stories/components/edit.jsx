import React from 'react';
import { browserHistory } from 'react-router';
import { ValidationError } from 'meteor/mdg:validation-error';
import Alert from 'react-s-alert';
import { i18n } from '/imports/libs/i18n';

import { validateStory, update } from '../actions/stories';
import StoryForm from './_form.jsx';

class EditStory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
    };
  }

  onUpdated(error) {
    if (error) {
      if (ValidationError.is(error)) {
        this.setState({ errors: error.errors });
      } else {
        Alert.error(i18n.t(error.error));
      }
    } else {
      Alert.success(i18n.t('editing.update_success'), { onRouteClose: false });
      browserHistory.replace('/stories');
    }
  }

  onUpdate(story) {
    update(this.props._id, story, this.onUpdated.bind(this));
  }

  onCancel() {
    browserHistory.push('/stories');
  }

  render() {
    return (
      <div>
        <StoryForm _id={this.props._id}
                   story={this.props.story}
                   errors={this.state.errors}
                   onSubmit={this.onUpdate.bind(this)}
                   onCancel={this.onCancel.bind(this)} />
      </div>
    );
  }
}

EditStory.propTypes = {
  _id: React.PropTypes.string,
  story: React.PropTypes.object,
};

export default EditStory;
