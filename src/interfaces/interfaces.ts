import { Event } from 'react-big-calendar';




export interface EventType extends Omit<Event, 'title'>  {
    _id: string;
    notes: string;
    bgColor: string;
    user: User;
    title: string;
}

export interface User {
    uid: string;
    name: string;
}

export interface AuthSuccessResponse {
    ok: boolean;
    uid: string;
    name: string;
    token: string;
}


export interface RenewTokenResponse {
    ok: boolean;
    uid: string;
    name: string;
    token: string;
}


