import React from 'react';
import { i18n } from '/imports/libs/i18n';

class StoryForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: '',
      name: '',
    };
  }

  componentWillMount() {
    this.onPropsSetOrChange(this.props);
  }

  onPropsSetOrChange(props) {
    const story = props.story || { name: '' };

    this.setState({
      _id: props._id,
      name: story.name,
    });
  }

  errorMessage(field) {
    return this.props.errors && this.props.errors[field];
  }

  errorClass(field) {
    return this.props.errors && !!this.props.errors[field] ? 'has-danger' : '';
  }

  changeName(e) {
    this.setState({ name: e.target.value });
  }

  onSubmit(event) {
    event.preventDefault();

    this.props.onSubmit({
      name: this.state.name,
    });
  }

  onCancel(event) {
    event.preventDefault();

    this.props.onCancel();
  }

  isNewStory() {
    return !this.state._id;
  }

  renderId() {
    if (this.isNewStory()) {
      return null;
    }

    return (
      <div className="form-group row">
        <label htmlFor="_id" className="col-sm-2 form-control-label text-xs-right font-weight-bold">
          {i18n.t('stories._id')}
        </label>
        <div className="col-sm-10">
          <p type="text" id="_id" name="_id"
             className="form-control-static" style={{ paddingLeft: '0.7rem' }}>
            {this.state._id}
          </p>
        </div>
      </div>
    );
  }

  render() {
    const isNew = this.isNewStory();

    const labelClass = 'col-sm-2 form-control-label text-xs-right font-weight-bold';
    const formTitle = i18n.t(isNew ? 'stories.enter_info' : 'stories.update_info');
    const addLabel = i18n.t(isNew ? 'editing.add' : 'editing.save');
    const backLabel = i18n.t('editing.cancel');

    return (
      <div>
        <header style={{ marginBottom: '15px' }}>
          <div className="btn-group pull-right" role="group">
            <a className="btn btn-primary btn-sm"
               style={{ marginRight: '10px', width: '90px' }}
               onClick={this.onSubmit.bind(this)}>{addLabel}</a>
            <a className="btn btn-secondary btn-sm"
               style={{ marginLift: '10px', width: '90px' }}
               onClick={this.onCancel.bind(this)}>{backLabel}</a>
          </div>
          <h4>{formTitle}</h4>
        </header>
        <div className="card">
          <div className="card-block">
            <form onSubmit={this.onSubmit.bind(this)} className="form-horizontal">
              {this.renderId()}
              <div className={`form-group row ${this.errorClass('name')}`}>
                <label htmlFor="name" className={labelClass}>
                  {i18n.t('stories.name')}</label>
                <div className="col-sm-3">
                  <input type="text" id="name" name="name"
                         className="form-control" style={{ minWidth: '218px' }}
                         placeholder={i18n.t('stories.placeholder_name')}
                         value={this.state.name}
                         onChange={this.changeName.bind(this)} />
                </div>
                <div className="col-sm-7 form-control-label">
                  <span className="text-danger">{this.errorMessage('name')}</span>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

StoryForm.propTypes = {
  _id: React.PropTypes.string,
  story: React.PropTypes.object,
  errors: React.PropTypes.object,
  onSubmit: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired,
};

export default StoryForm;
