import React from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';
import ConfirmModal from './confirm-modal.jsx';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  onConfirm() {
    Alert.success('Confirm selected');
    this.closeModal();
  }

  onCancel() {
    Alert.warning('Cancel selected');
    this.closeModal();
  }

  render() {
    return (
      <div>
        <Helmet title="Home" />
        <div className="home text-xs-center">
          <h1>Home</h1>
          <button type="button" className="btn btn-primary btn-lg"
                  onClick={this.openModal.bind(this)}>
            Welcome
          </button>
        </div>
        <ConfirmModal modalIsOpen={this.state.modalIsOpen}
                      icon="warn"
                      title='Welcome'
                      confirmText='OK'
                      cancelText='Cancel'
                      onConfirm={this.onConfirm.bind(this)}
                      onCancel={this.onCancel.bind(this)} />
      </div>
    );
  }
}

export default Home;