import { EventProps } from 'react-big-calendar';
import { EventType } from '../../interfaces/interfaces';

export const CalendarNoteBox = ({ event }: EventProps<EventType>) => {
    const { title, user } = event;
    return (
        <>
            <strong>{title}</strong>
            <span> - {user.name}</span>
        </>
    );
};
