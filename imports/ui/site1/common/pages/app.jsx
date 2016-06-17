import React from 'react';
import Helmet from 'react-helmet';
import Alert from 'react-s-alert';

import Navigation from '../containers/navigation.jsx';
import Footer from '../containers/footer.jsx';
import ConnectionNotification from '/imports/ui/_shared/components/connection-notification.jsx';

const CONNECTION_ISSUE_TIMEOUT = 5000;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showConnectionIssue: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      /* eslint-disable react/no-did-mount-set-state */
      this.setState({ showConnectionIssue: true });
    }, CONNECTION_ISSUE_TIMEOUT);
  }

  render() {
    const { showConnectionIssue } = this.state;
    const { connected } = this.props;
    const meta = [
      { name: 'charset', content: 'utf-8' },
      { name: 'description', content: 'intXtion' },
      {
        name: 'viewport',
        content: 'initial-scale=1, minimal-ui, maximum-scale=1, minimum-scale=1',
      },
    ];
    const link = [
      {
        rel: 'shortcut icon', type: 'image/png',
        href: 'favicon.ico?v1', sizes: '16x16 32x32 64x64',
      },
    ];

    return (
      <div>
        <Helmet
          titleTemplate="intXtion - %s"
          defaultTitle="intXtion"
          meta={meta}
          link={link}
        />
        <Navigation />
        <div className="app-content">
          {showConnectionIssue && !connected
            ? <ConnectionNotification />
            : null}
          { this.props.children }
        </div>
        <Footer />
        <Alert stack={ { limit: 3 } } position="top-right" offset={60} effect="genie" />
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.element.isRequired,
  connected: React.PropTypes.bool,  // server connection status
};

App.contextTypes = {
  router: React.PropTypes.object,
};

export default App;
