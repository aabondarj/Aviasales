import React, {useState, useEffect, useMemo} from "react";
import {useSelector, useDispatch} from 'react-redux'
import styles from './ticket-list.module.scss'
import Ticket from "../ticket/ticket";
import { RootState } from "../../store";
import TicketSearchService, { TicketApi } from "../service/ticket-service";
import Loader from "../loader";
import { stat } from "fs";


const TicketList = () => {

  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  let maxId = 8

  const tickets = useSelector((state: RootState) => state.filters.tickets)
  const filters = useSelector((state: RootState) => state.filters);
  const dispatch = useDispatch()

  useEffect(() => {
    const ticketService = new TicketSearchService();
    let isMounted = true;

    const fetchData = async () => {
      const searchId = await ticketService.getSearchId(dispatch);
      await ticketService.getTickets(searchId, dispatch, (progress: number) => {
        if (isMounted) {
          setProgress(progress);
        }
      });
      if (isMounted) {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  const filteredTickets = useMemo(() => {
    return tickets.filter(ticket => {
      if (filters.allChecked) {
        return true;
      }
      const stopsCount = ticket.segments[0].stops.length + ticket.segments[1].stops.length;
      return (
        (filters.withoutTransfersChecked && stopsCount === 0) ||
        (filters.oneTransferChecked && stopsCount === 1) ||
        (filters.twoTransfersChecked && stopsCount === 2) ||
        (filters.threeTransfersChecked && stopsCount === 3)
      );
    });
  }, [tickets, filters]);

  const sortedTickets = useMemo(() => {
    return filteredTickets.sort((a, b) => {
      if (filters.sortBy === 'price') {
        return (a.price - b.price);
      } else if (filters.sortBy === 'duration') {
        const durationA = a.segments[0].duration + a.segments[1].duration;
        const durationB = b.segments[0].duration + b.segments[1].duration;
        return durationA - durationB;
      } else if (filters.sortBy === 'optimal') {
        const optimalValueA = a.price + (a.segments[0].stops.length + a.segments[1].stops.length) + (a.segments[0].duration + a.segments[1].duration);
        const optimalValueB = b.price + (b.segments[0].stops.length + b.segments[1].stops.length) + (b.segments[0].duration + b.segments[1].duration);
        return optimalValueA - optimalValueB;
      }
      return 0;
    });
  }, [filteredTickets, filters.sortBy]);

  const elements = (
    sortedTickets.map((ticket) => {
      maxId++
      return (
        <li key = {maxId} className={styles[`ticket-item`]}>
        <Ticket ticket={ticket}/>
      </li>
      )
    })
  )

  return (
    <React.Fragment>
      {loading && <Loader progress={progress} />}
    <ul className={styles[`ticket-list`]}>
      {loading ? elements : elements.slice(0,5)}
    </ul>
    </React.Fragment>
  )
}

export default TicketList