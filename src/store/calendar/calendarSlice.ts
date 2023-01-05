import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { EventType } from '../../interfaces/interfaces';
import { addDays, addHours, startOfYesterday } from 'date-fns';
 

export interface CalendarState {
    isLoadingEvents: boolean;
    events: EventType[];
    activeEvent: EventType | null;
}
 
const initialState: CalendarState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
}


 
export const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        onLoadEvents: (state, action: PayloadAction<EventType[]> ) => {
            state.isLoadingEvents = false;
            action.payload.forEach(event => {
                const exist = state.events.some(dbEvent => dbEvent._id === event._id);
                if (!exist) {
                    state.events.push(event)
                };
            });
        },
        onSetActiveEvent: (state, action: PayloadAction<CalendarState['activeEvent']> ) => {
            state.activeEvent = action.payload;
        },
        onAddNewEvent: (state, action: PayloadAction<EventType> ) => {
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
        onLogoutCalendar: (state ) => {
            state.isLoadingEvents = true;
            state.events = [];
            state.activeEvent = null; 
        }
    }
});


export const { onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onLogoutCalendar } = calendarSlice.actions;