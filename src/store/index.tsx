import { configureStore } from '@reduxjs/toolkit';
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import { TicketApi } from '../components/service/ticket-service';
import filtersReducer from './filters-slice';
import thunk from 'redux-thunk';
import logger from 'redux-logger';


export interface RootState {
  filters: {
    allChecked: boolean;
    withoutTransfersChecked: boolean;
    oneTransferChecked: boolean;
    twoTransfersChecked: boolean;
    threeTransfersChecked: boolean;
    sortBy: string,
    tickets: TicketApi[]
  };
}
  

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
