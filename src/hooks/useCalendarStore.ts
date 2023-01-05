import { CreateNoteResponse, EventType, GetNotesResponse } from '../interfaces/interfaces';
import { CalendarState, onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';
import { useAppDispatch, useAppSelector } from './reduxToolkit';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers';
import Swal from 'sweetalert2';

export const useCalendarStore = () => {
    const dispatch = useAppDispatch();
    const { events, activeEvent } = useAppSelector((state) => state.calendar);
    const { user } = useAppSelector((state) => state.auth);

    const startLoadingEvents = async () => {
        try {
            const {data}: {data: GetNotesResponse} = await calendarApi.get('/events');
            const events = convertEventsToDateEvents(data.events);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log(error);
        }
    };

    const setActiveEvent = (event: CalendarState['activeEvent']) => {
        dispatch(onSetActiveEvent(event));
    };

    const startSavingEvent = async (event: Partial<EventType>) => {
        try {
            
            //actualizando
            if (event._id) {
                await calendarApi.put(`/events/${event._id}`, event);
                dispatch(onUpdateEvent({...event} as EventType));
                return;
            };

            //creando
            const {data}: {data: CreateNoteResponse} = await calendarApi.post('/events', event);
            const newEvent: Partial<EventType> = {
                ...event,
                _id: data.event._id,
                user: user!,
            };
            dispatch(onAddNewEvent(newEvent as EventType));
        } catch (error) {
            console.log(error);
            Swal.fire('Error al guardar', error.response.data.msg);
        }
    }



    const startDeletingEvent = async () => {
        try {
            await calendarApi.delete(`/events/${activeEvent!._id}`)
            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg);
        }
    }
    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        startLoadingEvents,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    };
};
