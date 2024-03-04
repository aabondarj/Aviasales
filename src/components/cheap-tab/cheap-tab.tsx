import React, {useEffect, useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortBy } from '../../store/filters-slice';
import { RootState } from '../../store';
import styles from '../app/app.module.scss'

const CheapTab = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state:RootState) => state.filters.sortBy);
  const cheapTabRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (sortBy === 'price') {
      cheapTabRef.current?.focus();
    }
  }, [sortBy])

  const handleClick = () => {
    dispatch(changeSortBy('price'));
  };

  return (
    <div 
    ref={cheapTabRef}
    className={`${styles[`tab`]} ${sortBy === 'price' ? styles.selected : ''}`} 
    onClick={handleClick}
    tabIndex={0}>
      <p className={styles[`tab-title`]}>САМЫЙ ДЕШЕВЫЙ</p>
    </div>
  );
};

export default CheapTab;
