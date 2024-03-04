import axios from 'axios'
import { Dispatch } from 'redux';
import { setTickets } from '../../store/filters-slice';

export interface TicketApi {
  price: number;
  carrier: string;
  segments: [
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    },
    {
      origin: string;
      destination: string;
      date: string;
      stops: string[];
      duration: number;
    }
  ];
}

export default class TicketSearchService {
	async getSearchId(dispatch: Dispatch<any>, ): Promise<string> {
		try {
			const response = await fetch(`https://aviasales-test-api.kata.academy/search`)
			const data = await response.json()
      console.log(data);
			return data.searchId
		} catch (error) {
      console.error('Error getting search ID:', error);
      return ''
    }
	}

	async getTickets(searchId: string, dispatch: Dispatch<any>, progressCallback: (progress: number) => void) {

    const p100 = (value: boolean) => {
      const interval = setTimeout(() => {value = true}, 1000)
      clearInterval(interval)
      return value
    }

    try {
      let tickets: TicketApi[] = [];
      let stop = false;
      let loadedTickets = 0;

      while (!stop) {
        try {
          const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
          const data = await response.json();
          if (data.tickets) {
            tickets = [...tickets, ...data.tickets];
          }
          dispatch(setTickets(tickets));
          loadedTickets += data.tickets.length;
          const totalTickets = data.stop ? loadedTickets : loadedTickets + 1000;
          const progress = (loadedTickets / totalTickets) * 100;
          progressCallback(progress);
          
          if (data.stop) {
            progressCallback(100)
            stop = data.stop
          }
          console.log(
            `totalTickets: ${totalTickets}
            loadedTickets: ${loadedTickets}
            progress: ${progress}
            stop: ${stop}`
            );
        }
        catch(er) {
          console.log(`ERRRRRR IS ${er}`);
        }
      }
    } catch (error) {
      console.error('Error getting tickets:', error);
      return []
    }
  }
}