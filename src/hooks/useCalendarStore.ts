import { EventType } from '../interfaces/interfaces';
import { CalendarState, onAddNewEevent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store';
import { useAppDispatch, useAppSelector } from './reduxToolkit';

export const useCalendarStore = () => {
    const dispatch = useAppDispatch();
    const { events, activeEvent } = useAppSelector((state) => state.calendar);

    const setActiveEvent = (event: CalendarState['activeEvent']) => {
        dispatch(onSetActiveEvent(event));
    };

    const startSavingEvent = async (event: Partial<EventType>) => {
        if (event._id) {
            dispatch(onUpdateEvent({...event} as EventType));
        } else {
            //creando

            const newEvent: Partial<EventType> = {
                ...event,
                _id: String(new Date().getTime()),
                bgColor: '#fafafa',
                user: {
                    _id: '123',
                    name: 'diego',
                },
            }

            dispatch(onAddNewEevent(newEvent as EventType));
        }
    }

    const startDeletingEvent = async () => {
        //todo eliminar en backend
        dispatch(onDeleteEvent());
    }
    return {
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,
        setActiveEvent,
        startSavingEvent,
        startDeletingEvent
    };
};
