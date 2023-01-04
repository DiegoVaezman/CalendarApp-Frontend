import React from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { formInitState } from './CalendarModal';
import { EventType } from '../../interfaces/interfaces';

export const FabDelete = () => {
    const { startDeletingEvent, hasEventSelected } = useCalendarStore();

    const handleDelete = () => {
        startDeletingEvent();
    };

    return (
        <button
            className='btn btn-danger fab-danger'
            onClick={handleDelete}
            style={{
                display: hasEventSelected ? '' : 'none',
            }}
        >
            <i className='fas fa-trash-alt'></i>
        </button>
    );
};
