import React, {useMemo} from "react";
import styles from './ticket.module.scss'
import { TicketApi } from "../service/ticket-service";
import TicketSearchService from "../service/ticket-service";

interface TicketProps {
  ticket: TicketApi
}

const Ticket: React.FC<TicketProps> = ({ticket}) => {

  const formatTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    return `${hours}ч ${remainingMinutes}м`;
  };

  const dateDA = (DateD: string, DateA: number): string => {

    const departureTime = new Date(DateD);
    const arrivalTime = new Date(departureTime.getTime());
    arrivalTime.setMinutes(arrivalTime.getMinutes() + DateA);

    const formatNumber = (num: number): string => num.toString().padStart(2, '0');

    const DateDStr = `${formatNumber(departureTime.getHours())}:${formatNumber(departureTime.getMinutes())}`;
    const DateAStr = `${formatNumber(arrivalTime.getHours())}:${formatNumber(arrivalTime.getMinutes())}`;
    return `${DateDStr} - ${DateAStr}`;

  }

	return (
		<React.Fragment>
		<div className={styles[`ticket-header`]}>
			<span className={styles[`total-price`]}>{`${ticket.price} р`}</span>
			<div className={styles[`logo`]}>
				<img src={`https://pics.avs.io/200/50/${ticket.carrier}.png`} alt="S7" className={styles[`logo-img`]}></img>
			</div>
		</div>
		<div className={styles[`ticket-body`]}>
      <div className={styles[`ticket-part`]}>
        <span>{`${ticket.segments["0"][`origin`]} - ${ticket.segments["0"][`destination`]}`}</span>
        <span>{`${dateDA(ticket.segments["0"][`date`], ticket.segments["0"][`duration`])}`}</span>
      </div>
      <div className={styles[`ticket-part`]}>
        <span>В ПУТИ</span>
        <span>{`${formatTime(ticket.segments["0"][`duration`])}`}</span>
      </div>
      <div className={styles[`ticket-part`]}>
        <span>{`${(ticket.segments["0"][`stops`]).length !== 0 ? (ticket.segments["0"][`stops`]).length : 'Без'} пересадки`}</span>
        <span>{`${(ticket.segments["0"][`stops`]).join(', ')}`}</span>
      </div>
		</div>
		<div className={styles[`ticket-body`]}>
      <div className={styles[`ticket-part`]}>
        <span>{`${ticket.segments["1"][`origin`]} - ${ticket.segments["1"][`destination`]}`}</span>
        <span>{`${dateDA(ticket.segments["1"][`date`], ticket.segments["1"][`duration`])}`}</span>
      </div>
      <div className={styles[`ticket-part`]}>
        <span>В ПУТИ</span>
        <span>{`${formatTime(ticket.segments["1"][`duration`])}`}</span>
      </div>
      <div className={styles[`ticket-part`]}>
        <span>{`${(ticket.segments["1"][`stops`]).length !== 0 ? (ticket.segments["1"][`stops`]).length : 'Без'} пересадки`}</span>
        <span>{`${(ticket.segments["1"][`stops`]).join(', ')}`}</span>
      </div>
		</div>
		</React.Fragment>
		
	)
}

export default Ticket