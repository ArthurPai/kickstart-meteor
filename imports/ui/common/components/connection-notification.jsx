import React from 'react';

const ConnectionNotification = () => (
  <div className="alert alert-warning alert-dismissible fade in" role="alert">
    <div className="text-xs-center">
      <strong>Warning!</strong> There seems to be a connection issue
    </div>
  </div>
);

export default ConnectionNotification;
