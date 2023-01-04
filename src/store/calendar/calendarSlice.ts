 import { createSlice } from '@reduxjs/toolkit';
 import type { PayloadAction } from '@reduxjs/toolkit';
import { EventType } from '../../interfaces/interfaces';
import { addDays, addHours, startOfYesterday } from 'date-fns';
 
const tempEvent: EventType[] = [{
    _id: '123456789',
   title: 'cumpleaños del jefe',
   notes: 'hay que comprar el pastel',
   start: startOfYesterday(),
   end: addHours(new Date(), 2),
   bgColor: '#fafafa',
   user: {
       _id: '123',
       name: 'diego',
   },
},
{
    _id: '123456789345',
   title: 'otro evento',
   notes: 'otras tareas',
   start: addDays(new Date, 4),
   end: addDays(new Date, 7),
   bgColor: '#fafafa',
   user: {
       _id: '123',
       name: 'diego',
   },
},
];

 export interface CalendarState {
     events: EventType[],
     activeEvent: EventType | null
 }
 
 const initialState: CalendarState = {
     events: tempEvent,
     activeEvent: null
 }


 
 export const calendarSlice = createSlice({
     name: 'calendar',
     initialState,
     reducers: {
         onSetActiveEvent: (state, action: PayloadAction<CalendarState['activeEvent']> ) => {
             state.activeEvent = action.payload;
         },
         onAddNewEevent: (state, action: PayloadAction<EventType> ) => {
             state.events.push(action.payload);
             state.activeEvent = null;
         },
         onUpdateEvent: (state, action: PayloadAction<EventType> ) => {
             state.events = state.events.map(event => {
                if (event._id === action.payload._id) {
                    return action.payload
                }
                return event;
             })
         },
         onDeleteEvent: (state ) => {
            if (state.activeEvent) {
                state.events = state.events.filter(event => event._id !== state.activeEvent?._id);
                state.activeEvent = null;
            }
         },
     }
 });
 
 
 export const { onSetActiveEvent, onAddNewEevent, onUpdateEvent, onDeleteEvent } = calendarSlice.actions;