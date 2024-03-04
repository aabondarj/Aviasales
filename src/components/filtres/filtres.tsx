import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  toggleAll,
  toggleWithoutTransfers,
  toggleOneTransfer,
  toggleTwoTransfers,
  toggleThreeTransfers,
} from '../../store/filters-slice';
import { RootState } from "../../store";
import styles from './filtres.module.scss'

const Filtres = () => {

  const filters = useSelector((state: RootState) => state.filters)
  const dispatch = useDispatch();

  const handleToggleAll = () => {
    dispatch(toggleAll());
  };

  const handletoggleWithoutTransfers = () => {
    dispatch(toggleWithoutTransfers());
  };

  const handletoggleOneTransfer = () => {
    dispatch(toggleOneTransfer());
  };

  const handletoggleTwoTransfers = () => {
    dispatch(toggleTwoTransfers());
  };

  const handletoggleThreeTransfers = () => {
    dispatch(toggleThreeTransfers());
  };

  return (
    <div className={styles[`filtres`]}>
      <span className={styles[`filtres-title`]}>{`КОЛИЧЕСТВО ПЕРЕСАДОК`}</span>
      <form className={styles[`filtres-form`]}>
        <label>
          <input 
            type="checkbox"
            name="all"
            checked={filters.allChecked}
            onClick={handleToggleAll}></input>
          Все
        </label>
        <label>
          <input 
            type="checkbox"
            name="without"
            checked={filters.withoutTransfersChecked}
            onClick={handletoggleWithoutTransfers}></input>
          Без пересадок
        </label>
        <label>
          <input 
            type="checkbox"
            name="one"
            checked={filters.oneTransferChecked}
            onClick={handletoggleOneTransfer}></input>
          1 пересадка
        </label>
        <label>
          <input 
            type="checkbox"
            name="two"
            checked={filters.twoTransfersChecked}
            onClick={handletoggleTwoTransfers}></input>
          2 пересадки
        </label>
        <label>
          <input 
            type="checkbox"
            name="three"
            checked={filters.threeTransfersChecked}
            onClick={handletoggleThreeTransfers}></input>
          3 пересадки
        </label>
      </form>
    </div>
  )
}

export default Filtres;