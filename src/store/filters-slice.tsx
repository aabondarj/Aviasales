import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TicketApi } from '../components/service/ticket-service';

const initialState = {
  allChecked: true,
  withoutTransfersChecked: true,
  oneTransferChecked: true,
  twoTransfersChecked: true,
  threeTransfersChecked: true,
  sortBy: 'price',
  tickets: [] as TicketApi[]
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleAll(state) {
      state.allChecked = !state.allChecked;

      state.withoutTransfersChecked = state.allChecked;
      state.oneTransferChecked = state.allChecked;
      state.twoTransfersChecked = state.allChecked;
      state.threeTransfersChecked = state.allChecked;
      
    },
    toggleWithoutTransfers(state) {
      state.withoutTransfersChecked = !state.withoutTransfersChecked;
      if (!state.withoutTransfersChecked) {
        state.allChecked = false;
      }
    },
    toggleOneTransfer(state) {
      state.oneTransferChecked = !state.oneTransferChecked;
      if (!state.oneTransferChecked) {
        state.allChecked = false;
      }
    },
    toggleTwoTransfers(state) {
      state.twoTransfersChecked = !state.twoTransfersChecked;
      if (!state.twoTransfersChecked) {
        state.allChecked = false;
      }
    },
    toggleThreeTransfers(state) {
      state.threeTransfersChecked = !state.threeTransfersChecked;
      if (!state.threeTransfersChecked) {
        state.allChecked = false;
      }
    },
    changeSortBy(state, action: PayloadAction<'price'|'duration'>) {
      state.sortBy = action.payload
    },
    setTickets(state, action: PayloadAction<TicketApi[]>) {
      state.tickets = action.payload;
    },
  },
});

export const {
  toggleAll,
  toggleWithoutTransfers,
  toggleOneTransfer,
  toggleTwoTransfers,
  toggleThreeTransfers,
  changeSortBy,
  setTickets
} = filtersSlice.actions;

export default filtersSlice.reducer;
