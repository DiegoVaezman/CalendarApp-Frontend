import React from 'react';
import ReactDOM from 'react-dom/client';
import { CalendarApp } from './CalendarApp';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <CalendarApp />
    </React.StrictMode>
);
