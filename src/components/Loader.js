import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Icons from "@fortawesome/free-solid-svg-icons"

const Loader = () => (
  <div className="loader-wrapper">
      <FontAwesomeIcon icon={Icons.faSpinner} spin size="2x" className="loader-icon" />
  </div>
);

export default Loader;