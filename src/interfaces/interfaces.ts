import { Event } from 'react-big-calendar';




export interface EventType extends Omit<Event, 'title'>  {
    _id: string;
    notes: string;
    bgColor: string;
    user: User;
    title: string;
}

export interface User {
    _id: string;
    name: string;
}

export interface AuthSuccessResponse {
    ok: boolean;
    _id: string;
    name: string;
    token: string;
}

export interface GetNotesResponse {
    ok: boolean;
    events: NoteResponse[]
}

export interface NoteResponse extends Omit<EventType, 'start' | 'end'>{
    start: string;
    end: string;
}


export interface RenewTokenResponse {
    ok: boolean;
    _id: string;
    name: string;
    token: string;
}

export interface CreateNoteResponse {
    ok: boolean;
    event: EventType;
}


