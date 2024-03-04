import React, {useState, useEffect} from "react";
import styles from './app.module.scss'
import TicketList from "../ticket-list";
import Filtres from "../filtres";
import CheapTab from '../cheap-tab';
import FastTab from '../fast-tab';
import Loader from "../loader";

const App = () => {

  // const [loading, setLoading] = useState(true);
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   // Имитация загрузки данных
  //   const interval = setInterval(() => {
  //     setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
  //   }, 1000);

  //   // Имитация завершения загрузки данных
  //   setTimeout(() => {
  //     setLoading(false);
  //     clearInterval(interval);
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <React.Fragment>
      <section className={styles[`main-section`]}>
      <Filtres />
      <div className={styles[`tickets-frame`]}>
        <div className={styles[`tabs`]}>
          <CheapTab />
          <div className={styles[`stick`]}></div>
          <FastTab />
        </div>
        {/* {loading && <Loader progress={progress} />} */}
        <TicketList />
      </div>
      </section>
    </React.Fragment>
  )
}

export default App;