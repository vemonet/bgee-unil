import React from 'react';
import i18n from '../../../i18n';
import Bulma from '../../Bulma';

const Footer = () => (
  <Bulma.Footer>
    <div className="is-flex is-justify-content-space-between">
      <div className="left-wrapper">
        <a
          href="https://www.sib.swiss/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {i18n.t('global.footer.sib')}
        </a>
        <a
          className="image"
          rel="license noopener noreferrer"
          href="https://creativecommons.org/publicdomain/zero/1.0/"
          target="_blank"
        >
          <Bulma.Image
            className="bgee-cc"
            src="https://bgee.org/img/cc-zero.png"
            alt="CC0"
          />
        </a>
      </div>
      <div className="right-wrapper">
        <a
          href="https://www.sib.swiss/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {i18n.t('global.footer.copy-link')}
        </a>
        <a
          href="https://www.sib.swiss/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {i18n.t('global.footer.cite-us')}
        </a>
        <a
          href="https://www.sib.swiss/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {i18n.t('global.footer.contact-us')}
        </a>
      </div>
    </div>
  </Bulma.Footer>
);

export default Footer;
