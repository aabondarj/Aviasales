import React from 'react';
import { useDispatch } from 'react-redux';
import { changeSortBy } from '../../store/filters-slice';
import styles from '../app/app.module.scss'

const FastTab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeSortBy('duration'));
  };

  return (
    <div className={styles[`tab`]} onClick={handleClick} tabIndex={1}>
      <p className={styles[`tab-title`]}>САМЫЙ БЫСТРЫЙ</p>
    </div>
  );
};

export default FastTab;