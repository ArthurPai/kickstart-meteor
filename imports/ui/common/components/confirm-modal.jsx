import React from 'react';
import Modal from 'react-modal';

class ConfirmModal extends React.Component {
  onConfirm() {
    if (this.props.onConfirm) {
      this.props.onConfirm();
    }
  }

  onCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  iconImg() {
    switch (this.props.icon) {
      case 'warn':
        return '/icons/warn.png';
      default:
        return '/icons/warn.png';
    }
  }

  render() {
    const iconStyle = { marginTop: '26px', marginBottom: '20px' };
    const buttonStyle = { marginLeft: '17px', marginRight: '17px', width: '194px', height: '46px' };
    const icon = this.iconImg();
    const confirmText = this.props.confirmText || 'OK';
    const cancelText = this.props.cancelText || 'Cancel';

    return (
      <Modal
        className="Modal__Bootstrap modal-dialog"
        closeTimeoutMS={150}
        isOpen={this.props.modalIsOpen}
        onRequestClose={this.onCancel.bind(this)}>
        <div className="modal-content">
          <div className="modal-body text-xs-center">
            <img src={icon} style={iconStyle} />
            <h4 style={{ color: '#585858' }}>
              {this.props.title}
            </h4>
            <div style={{ marginTop: '40px' }}>
              <button type="button" className="btn btn-primary" style={buttonStyle}
                      onClick={this.onConfirm.bind(this)}>
                {confirmText}
              </button>
              <button type="button" className="btn btn-default" style={buttonStyle}
                      onClick={this.onCancel.bind(this)}>
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

ConfirmModal.propTypes = {
  modalIsOpen: React.PropTypes.bool.isRequired,
  icon: React.PropTypes.string,
  title: React.PropTypes.string,
  confirmText: React.PropTypes.string,
  cancelText: React.PropTypes.string,
  onConfirm: React.PropTypes.func,
  onCancel: React.PropTypes.func,
};

export default ConfirmModal;
