import React from 'react';
import { useDispatch } from 'react-redux';
import { changeSortBy } from '../../store/filters-slice';
import styles from '../app/app.module.scss'

const OptimalTab = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(changeSortBy('optimal'));
  };

  return (
    <div className={styles[`tab`]} onClick={handleClick} tabIndex={1}>
      <p className={styles[`tab-title`]}>САМЫЙ ОПТИМАЛЬНЫЙ</p>
    </div>
  );
};

export default OptimalTab;