import { parseISO } from 'date-fns';
import { EventType, NoteResponse } from '../interfaces/interfaces';


export const convertEventsToDateEvents = (events: NoteResponse[]) => {
    return events.map(event => {
        const dateEvent: EventType = {
            ...event,
            start: parseISO(event.start),
            end: parseISO(event.end),
        }
        
        return dateEvent;
    })
}