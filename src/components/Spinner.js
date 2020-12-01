import React from 'react';
import styles from '../styles/Spinner.module.css';

const Spinner = ({ poss }) => (
  <div className={`${styles.spinnerWrap} ${poss ? styles.spinCentered : ''}`}>
    <div className={styles.ldio_psskyvscmbi}>
      <div />
      <div>
        <div />
      </div>
    </div>
  </div>
);

export default Spinner;
