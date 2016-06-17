import React from 'react';
import { browserHistory } from 'react-router';
import { ValidationError } from 'meteor/mdg:validation-error';
import Alert from 'react-s-alert';
import { i18n } from '/imports/libs/i18n';

import { create } from '../actions/stories';
import StoryForm from './_form.jsx';

class NewStory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: null,
    };
  }

  onCreated(error) {
    if (error) {
      if (ValidationError.is(error)) {
        this.setState({ errors: error.errors });
      } else {
        Alert.error(i18n.t(error.error));
      }
    } else {
      Alert.success(i18n.t('editing.add_success'), { onRouteClose: false });
      browserHistory.replace('/stories');
    }
  }

  onCreate(story) {
    create(story, this.onCreated.bind(this));
  }

  onCancel() {
    browserHistory.push('/stories');
  }

  render() {
    return (
      <div>
        <StoryForm errors={this.state.errors}
                   onSubmit={this.onCreate.bind(this)}
                   onCancel={this.onCancel.bind(this)} />
      </div>
    );
  }
}

export default NewStory;
