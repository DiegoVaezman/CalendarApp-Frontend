export const events = [
    {
        _id: '1',
        notes: 'test note',
        bgColor: '#234565',
        user: {
            _id: '1234abc',
            name: 'test',
        },
        title: 'test title',
        start: new Date('2022-10-21 13:00:00'),
        end: new Date('2022-10-21 15:00:00'),
    },
    {
        _id: '2',
        notes: 'test note 2',
        bgColor: '#234565',
        user: {
            _id: '1234abc',
            name: 'test',
        },
        title: 'test title 2',
        start: new Date('2022-10-23 14:00:00'),
        end: new Date('2022-10-23 16:00:00'),
    },
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null,
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: null,
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [...events],
    activeEvent: { ...events[0] },
};
