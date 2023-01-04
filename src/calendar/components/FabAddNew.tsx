import React from 'react';
import { useUiStore } from '../../hooks/useUiStore';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { formInitState } from './CalendarModal';
import { EventType } from '../../interfaces/interfaces';

export const FabAddNew = () => {
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        setActiveEvent(formInitState as EventType);
        openDateModal();
    };

    return (
        <button className='btn btn-primary fab' onClick={handleClickNew}>
            <i className='fas fa-plus'></i>
        </button>
    );
};
