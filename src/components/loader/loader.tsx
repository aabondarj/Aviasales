import React from 'react';
import styles from './loader.module.scss';

interface LoaderProps {
  progress: number;
}

const Loader: React.FC<LoaderProps> = ({ progress }) => {
  return (
    <div className={styles.loader}>
      <div className={styles.progressBar} style={{ width: `${progress}%` }}></div>
      {/* <div className={styles.progressText}>{`${progress}%`}</div> */}
      <div className={styles.progressText}>
        <p>
        {`Поиск подходящих вариантов...`}
        </p>
      </div>
    </div>
  );
};

export default Loader;
