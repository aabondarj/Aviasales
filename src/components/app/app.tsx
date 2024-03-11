import React, {useState, useEffect} from "react";
import styles from './app.module.scss'
import TicketList from "../ticket-list";
import Filtres from "../filtres";
import CheapTab from '../cheap-tab';
import FastTab from '../fast-tab';
import OptimalTab from "../optimal-tab";

const App = () => {

  return (
    <React.Fragment>
      <section className={styles[`main-section`]}>
      <Filtres />
      <div className={styles[`tickets-frame`]}>
        <div className={styles[`tabs`]}>
          <CheapTab />
          <div className={styles[`stick`]}></div>
          <FastTab />
          <div className={styles[`stick`]}></div>
          <OptimalTab />
        </div>
        <TicketList />
      </div>
      </section>
    </React.Fragment>
  )
}

export default App;