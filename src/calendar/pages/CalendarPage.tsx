import { Calendar, EventPropGetter, View } from 'react-big-calendar';
import { addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {
    Navbar,
    CalendarNoteBox,
    CalendarModal,
    FabAddNew,
    FabDelete,
} from '../';
import { localizer, getMessagesES } from '../../helpers';
import { EventType } from '../../interfaces/interfaces';
import { useState, useCallback, useEffect } from 'react';
import { useAuthStore, useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';

export const CalendarPage = () => {
    const { openDateModal } = useUiStore();
    const { user } = useAuthStore();
    const { events, startLoadingEvents, setActiveEvent, activeEvent } =
        useCalendarStore();
    const [lastView, setLastView] = useState<View>(
        (localStorage.getItem('lastView') as View) || 'week'
    );

    const eventStyleGetter: EventPropGetter<EventType> = (
        event,
        start,
        end,
        isSelected
    ) => {
        const style: React.CSSProperties = {
            backgroundColor:
                event.user._id === user?._id ? '#347CF7' : '#465660',
            borderRadius: '0px',
            opacity: isSelected ? 1 : 0.75,
            color: 'white',
            paddingLeft: isSelected ? 0 : 5,
            borderLeft: isSelected ? '5px solid red' : '',
        };
        return { style };
    };

    const onDoubleClick = (event: EventType) => {
        openDateModal();
    };

    const onSelect = (event: EventType) => {
        setActiveEvent(event);
    };

    const onViewChanged = (event: View) => {
        localStorage.setItem('lastView', event);
        setLastView(event);
    };

    useEffect(() => {
        startLoadingEvents();
    }, []);

    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                localizer={localizer}
                events={events}
                defaultView={lastView}
                startAccessor='start'
                endAccessor='end'
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarNoteBox,
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChanged}
            />
            <CalendarModal />
            <FabAddNew />
            <FabDelete />
        </>
    );
};
