import React from 'react';
import { i18n } from '/imports/libs/i18n';

const Footer = () => (
  <footer className="footer">
    <div className="text-xs-center">
      <p className="text-muted">{i18n.t('common.powered_by')}</p>
    </div>
  </footer>
);

export default Footer;
