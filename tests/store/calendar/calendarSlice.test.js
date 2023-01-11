import {
    calendarSlice,
    onLoadEvents,
    onSetActiveEvent,
    onAddNewEvent,
    onUpdateEvent,
    onDeleteEvent,
    onLogoutCalendar,
} from '../../../src/store/calendar/calendarSlice';
import {
    calendarWithActiveEventState,
    calendarWithEventsState,
    events,
    initialState,
} from '../../fixtures/calendarStates';

describe('Testing calendarState', () => {
    test('should return default state', () => {
        expect(calendarSlice.getInitialState()).toEqual(initialState);
    });

    test('should onSetActiveEvent activate event', () => {
        const state = calendarSlice.reducer(
            calendarWithEventsState,
            onSetActiveEvent(events[0])
        );
        expect(state.activeEvent).toEqual(events[0]);
    });

    test('should onAddNewEvent add new event', () => {
        const newEvent = {
            _id: '3',
            notes: 'test note 3',
            bgColor: '#234565',
            user: {
                _id: '1234abc',
                name: 'test',
            },
            title: 'test title 3',
            start: new Date('2022-10-28 13:00:00'),
            end: new Date('2022-10-28 15:00:00'),
        };
        const state = calendarSlice.reducer(
            calendarWithEventsState,
            onAddNewEvent(newEvent)
        );
        expect(state.events).toEqual([...events, newEvent]);
    });

    test('should onUpdateEvent update event', () => {
        const updatedEvent = {
            _id: '2',
            notes: 'test note 2 updated',
            bgColor: '#234565',
            user: {
                _id: '1234abc',
                name: 'test',
            },
            title: 'test title 2 updated',
            start: new Date('2022-10-29 13:00:00'),
            end: new Date('2022-10-29 15:00:00'),
        };
        const state = calendarSlice.reducer(
            calendarWithEventsState,
            onUpdateEvent(updatedEvent)
        );
        expect(state.events).toContain(updatedEvent);
    });

    test('should onDeleteEvent delete active event', () => {
        const state = calendarSlice.reducer(
            calendarWithActiveEventState,
            onDeleteEvent()
        );
        expect(state.activeEvent).toBe(null);
        expect(state.events).toEqual(
            events.filter(
                (event) =>
                    event._id !== calendarWithActiveEventState.activeEvent._id
            )
        );
    });

    test('should onLoadEvents set events', () => {
        const state = calendarSlice.reducer(initialState, onLoadEvents(events));
        expect(state.events).toEqual([...events]);
        expect(state.isLoadingEvents).toBeFalsy();

        const newState = calendarSlice.reducer(state, onLoadEvents(events));
        expect(state.events.length).toBe(events.length);
    });

    test('should onLogoutCalendar clear state', () => {
        const state = calendarSlice.reducer(
            calendarWithActiveEventState,
            onLogoutCalendar()
        );
        expect(state).toEqual(initialState);
    });
});
